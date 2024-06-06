import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChildWatchedVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = 'user-id'; // Replace with the actual user ID
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchWatchedVideos = async () => {
            try {
                const response = await axios.get(`${apiUrl}/parent/childwatched/65df757175d959b627baeef2`,);
                // console.log(response.data);
                setVideos(response.data.videos);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWatchedVideos();
    }, [apiUrl, userId]);

    if (loading) {
        return <div className="mx-10">Loading...</div>;
    }

    if (error) {
        return <div className="mx-10 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="m-10">
            {videos.length === 0 ? (
                <p>No videos watched yet.</p>
            ) : (
                <section>
                    {videos.map((video, index) => (
                        <div key={index} className="flex bg-white shadow">
                            <img src={video.thumbnail} alt={video.title} className='' />
                            <div className=' px-3 py-1'>
                                <div className='font-bold text-2xl underline underline-offset-2'>{video.title}</div>
                                <div className='font-bold text-lg'>{video.course.name}</div>
                                <div className=' text-gray-600'>{video.description}</div>
                                <div className=''>Teacher Contact: <span className=' text-red-500'>{video.author.email}</span> </div>
                            </div>
                        </div>
                        
                    ))}
                </section>
            )}
        </div>
    );
}
