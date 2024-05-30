import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const response = await axios.get(`${apiUrl}/user/getenrolled/65df757175d959b627baeef2`);
                setCourses(response.data.courses);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, [apiUrl]);

    if (loading) {
        return <div className="m-10">Loading...</div>;
    }

    if (error) {
        return <div className="m-10 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="m-10">
            <h1 className="font-bold text-xl mb-4">My Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map(course => (
                    <div key={course._id} className="border p-4 rounded-lg shadow-md">
                        <img src={course.thumbnail} alt={course.name} className="w-full h-32 object-cover rounded-md mb-4" />
                        <h2 className="text-lg font-semibold mb-2">{course.name}</h2>
                        <p className="text-gray-700 mb-4">
                            {course.description.length > 150 ? `${course.description.substring(0, 150)}...` : course.description}
                        </p>
                        <p className="text-sm text-gray-500">Enrolled: {course.enrolled} {course._id}</p>
                        <button className=' py-2 w-full bg-black text-white font-semibold text-lg rounded-md ' onClick={()=>navigate(`/viewcourse/${course._id}`)}>Continue Learning </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
