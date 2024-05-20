import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ApprovalVideos() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApprovalVideos = async () => {
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}/admin/getapprovalpendingvideos`);
                console.log(response.data)
                if (response.status === 200) {
                    setVideos(response.data.videos);
                }
            } catch (error) {
                console.log(error);
                setError('Failed to fetch approval pending videos');
                toast.error('Failed to fetch approval pending videos');
            } finally {
                setLoading(false);
            }
        };
        fetchApprovalVideos();
    }, [apiUrl]);

    const handleApprove = async (videoId) => {
        try {
            const response = await axios.put(`${apiUrl}/admin/approvevideo/${videoId}`);
            if (response.status === 200) {
                toast.success('Video approved successfully');
                // Remove the approved video from the videos array
                setVideos(prevVideos => prevVideos.filter(video => video._id !== videoId));
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to approve video');
        }
    };


    return (
        <div className="p-6">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Approval Pending Videos</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border border-gray-300">Thumbnail</th>
                            <th className="py-2 px-4 border border-gray-300">Title</th>
                            <th className="py-2 px-4 border border-gray-300">Description</th>
                            <th className="py-2 px-4 border border-gray-300">Author</th>
                            <th className="py-2 px-4 border border-gray-300">Course</th>
                            <th className="py-2 px-4 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video) => (
                            <tr key={video._id}>
                                <td className="py-2 px-4 border border-gray-300">
                                    <img src={video.thumbnail} alt={video.title} className="h-20 w-20 object-cover" />
                                </td>
                                <td className="py-2 px-4 border border-gray-300">{video.title}</td>
                                <td className="py-2 px-4 border border-gray-300">{video.description}</td>
                                <td className="py-2 px-4 border border-gray-300">{video.author._id}</td>
                                <td className="py-2 px-4 border border-gray-300">{video.course.name}</td>
                                <td className="py-2 px-4 border border-gray-300 flex space-x-2">
                                    <button onClick={() => handleApprove(video._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                        Approve
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        View
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
