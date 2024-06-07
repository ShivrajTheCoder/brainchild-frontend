import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CourseVideoContainer({ courseId }) {
    // console.log(courseId);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fullScreenVideo, setFullScreenVideo] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const user=useSelector((state)=>state.user);
    const {userId,token}=user;
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${apiUrl}/courses/getcoursevideos/${courseId}`);
                console.log(response.data.videos,"here are the watched videos");
                setVideos(response.data.videos);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [apiUrl, courseId]);

    const addWatchedVideo=async(videoId)=>{
        try {
            const response=await axios.post(`${apiUrl}/user/watchedvideo`,{
                userId,
                videoId
            })
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleVideoClick =async (url,videoId) => {
        await addWatchedVideo(videoId);
        setFullScreenVideo(url);
    };

    const handleCloseFullScreen = () => {
        setFullScreenVideo(null);
    };

    if (loading) {
        return <div className="mx-10">Loading...</div>;
    }

    if (error) {
        return <div className="mx-10 text-red-500">No Videos yet!</div>;
    }

    return (
        <div>
            <section className="mx-10">
                <h1 className="font-bold text-2xl">Course Content</h1>
                <div className='grid grid-cols-3 gap-6'>
                    <div className="mt-4 col-span-2 my-5">
                        <table className="min-w-full divide-y divide-gray-200 my-5">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-gray-500 uppercase tracking-wider text-xl font-bold">
                                        Video Title
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y border divide-gray-200 font-bold">
                                {videos.map((video, index) => (
                                    <tr key={index} onClick={() => handleVideoClick(video.videourl,video._id)} className="cursor-pointer hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap">{video.title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {fullScreenVideo && (
                <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex items-center justify-center">
                    <video src={fullScreenVideo} className="w-full h-full" controls autoPlay />
                    <button className="absolute top-5 right-5 text-white" onClick={handleCloseFullScreen}>Close</button>
                </div>
            )}
        </div>
    );
}
