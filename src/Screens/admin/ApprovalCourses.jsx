import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ApprovalCourses() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnapprovedCourses = async () => {
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}/admin//getapprovalpendingcourses`);
                console.log(response.data.courses);
                if (response.status === 200) {
                    setCourses(response.data.courses);
                }
            } catch (error) {
                console.log(error);
                setError('Failed to fetch unapproved courses');
                toast.error('Failed to fetch unapproved courses');
            } finally {
                setLoading(false);
            }
        };
        fetchUnapprovedCourses();
    }, [apiUrl]);

    const handleApprove = async (courseId) => {
        try {
            const response = await axios.put(`${apiUrl}/admin/approvecourse`, { courseId, approval: true });
            if (response.status === 200) {
                toast.success('Course approved successfully');
                // Remove the approved course from the courses array
                setCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to approve course');
        }
    };

    return (
        <div className="p-6">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Approval Pending Courses</h1>
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
                            <th className="py-2 px-4 border border-gray-300">Author</th>
                            <th className="py-2 px-4 border border-gray-300">Thumbnail</th>
                            <th className="py-2 px-4 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course._id}>
                                <td className="py-2 px-4 border border-gray-300">{course.name}</td>
                                <td className="py-2 px-4 border border-gray-300">{course.description}</td>
                                <td className="py-2 px-4 border border-gray-300">{course.author}</td>
                                <td className="py-2 px-4 border border-gray-300">
                                    <img src={course.thumbnail} alt={course.name} className="h-10 w-10 object-cover" />
                                </td>
                                <td className="py-2 px-4 border border-gray-300">
                                    <button onClick={() => handleApprove(course._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
