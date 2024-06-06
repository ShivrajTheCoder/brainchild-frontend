import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

export default function TeacherCourses() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const teacher = useSelector((state) => state.teacher);
    const { isLoggedIn,userId } = teacher;
  const authorId = userId;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}/teacher/getallteachercourse/${authorId}`);
        if (response.status === 200) {
          setCourses(response.data.courses);
        }
      } catch (error) {
        console.log(error);
        setError('Failed to fetch courses');
        toast.error('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [apiUrl, authorId]);

  const filteredCourses = courses.filter(course => {
    if (filter === 'approved') return course.approved;
    if (filter === 'notApproved') return !course.approved;
    return true; // 'all' case
  });

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Teacher Courses</h1>
      <div className="mb-4">
        <label className="mr-2">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded py-1 px-2"
        >
          <option value="all">All Courses</option>
          <option value="approved">Approved</option>
          <option value="notApproved">Not Approved</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Description</th>
              <th className="py-2 px-4 border border-gray-300">Videos</th>
              <th className="py-2 px-4 border border-gray-300">Enrolled</th>
              <th className="py-2 px-4 border border-gray-300">Approved</th>
              <th className="py-2 px-4 border border-gray-300">Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course._id}>
                <td className="py-2 px-4 border border-gray-300">{course.name}</td>
                <td className="py-2 px-4 border border-gray-300">{course.description}</td>
                <td className="py-2 px-4 border border-gray-300">{course.videos.length}</td>
                <td className="py-2 px-4 border border-gray-300">{course.enrolled}</td>
                <td className="py-2 px-4 border border-gray-300">{course.approved ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <img src={course.thumbnail} alt={course.name} className="h-10 w-10 object-cover" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
