import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ErrorComponent from '../../Components/ErrorComponent';
import LoaingComponent from '../../Components/LoaingComponent';
import CourseVideoContainer from '../../Components/HomeComponents/CourseVideoContainer';

export default function ViewCourse() {
    const [enrreq,setEnreq]=useState(false);
    const { courseId } = useParams();
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [fullScreenVideo, setFullScreenVideo] = useState(null);
    const defaultImageUrl =  'https://res.cloudinary.com/dushmacr8/image/upload/v1686558017/samples/landscapes/nature-mountains.jpg';
    useEffect(() => {
        setError(null);
        const fetchCourse = async () => {
            try {
                const resp = await axios.get(`${apiUrl}/courses/getcourse/${courseId}`);
                console.log(resp.data.course);
                setCourse(resp.data.course);
            } catch (error) {
                setError(error.message ? error.message : "Something went wrong!");
            }
            setLoading(false);
        };
        fetchCourse();
    }, [courseId]);
    // Define the videos array
    const videos = [
        { title: 'Video 1 Title', url: 'https://res.cloudinary.com/dushmacr8/video/upload/v1686558021/samples/sea-turtle.mp4' },
        { title: 'Video 2 Title', url: 'https://res.cloudinary.com/dushmacr8/video/upload/v1686558021/samples/sea-turtle.mp4' },
        // Add more videos as needed
    ];

    const handleVideoClick = (videoUrl) => {
        setFullScreenVideo(videoUrl);
        if (document.fullscreenEnabled) {
            const videoElement = document.getElementById('fullscreen-video');
            videoElement.requestFullscreen();
        }
    };

    const handleCloseFullScreen = () => {
        setFullScreenVideo(null);
        document.exitFullscreen();
    };

    return (
        <>
            {loading && <LoaingComponent />}
            {error && <ErrorComponent message={error} />}
            {!loading && !error && course && (
                <section>
                    <div className='h-64 bg-gray-900 w-full relative grid grid-cols-3'>
                        <div className='text-white col-span-2 flex flex-col items-center py-5'>
                            <div>
                                <h1 className=' text-3xl font-extrabold my-3'>{course.name}</h1>
                                <p className='text-xl mb-2'>"Take your Dev Skills to the new Level"</p>
                                <p className='text-lg text-yellow-400'>4.3 **** <span className=' text-blue-700'>(200 ratings)</span></p>
                                <p >By <span className=' text-blue-700 underline underline-offset-2'>Shivraj Thapliyal</span></p>
                            </div>
                        </div>
                        <img src={course.thumbnail} alt="course image" className='h-64 absolute top-20 right-8 rounded-lg' />
                    </div>
                    <div className=' my-10 mx-10 grid grid-cols-3'>
                        <p className='px-8 text-lg border py-8 mx-3 col-span-2'>{course.description}</p>
                    </div>
                    <CourseVideoContainer courseId={course._id} />
                </section>
            )}
        </>
    )
}
