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
            <h2 className=" font-light text-xl mb-5">Watched Videos</h2>
            {videos.length === 0 ? (
                <p>No videos watched yet.</p>
            ) : (
                <ul>
                    {videos.map((video, index) => (
                        <li key={index} className="my-2 grid grid-cols-6">
                            <h3 className="font-semibold col-span">{video.title}</h3>
                            <img src={video.thumbnail} alt={video.title} className="w-32 h-18 object-cover col-span-2" />
                            <p>{video.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
