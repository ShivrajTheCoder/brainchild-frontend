import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingComponent from "../Components/LoaingComponent";
import ErrorComponent from '../Components/ErrorComponent';
import { BASE_URL } from '../BASE_URL';
import { useSelector } from 'react-redux';

export default function CourseDetails() {
    const user=useSelector((state)=>state.user);
    const {userId,parentId,token}=user;
    console.log(user);
    const [enrreq, setEnreq] = useState(false);
    const { courseId } = useParams();
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = BASE_URL; // Assuming BASE_URL is defined elsewhere
    const [fullScreenVideo, setFullScreenVideo] = useState(null);
    const defaultImageUrl = 'https://res.cloudinary.com/dushmacr8/image/upload/v1686558017/samples/landscapes/nature-mountains.jpg';
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
    const handleEnroll = async () => {
        try {
            const resp = await axios.post(`${apiUrl}/user/requestenrollment`, {
                courseId: courseId,
                parentId ,
                userId
            })
            console.log(resp);
            if (resp.status === 201) {
                console.log("sucess");
                setEnreq(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
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
            {loading && <LoadingComponent />}
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
                    <div className=' my-10 mx-10 grid grid-cols-3 '>
                        <div className='px-8 text-lg border py-8 mx-3 col-span-2 bg-white rounded shadow'>
                            <h3 className='text-2xl font-extrabold underline mb-3'>About the Course</h3>
                            <p className=' font-normal' >{course.description}</p>
                        </div>
                        <div className='w-full flex flex-col-reverse px-5 py-3'>
                            {!enrreq && <button className='py-3 px-5 border w-full my-5 text-xl font-bold bg-gradient-to-r from-blue-50 to-blue-100 shadow-md' onClick={handleEnroll}>
                                Request Enrollment
                            </button>}
                            {enrreq && <button className='py-3 px-5 border w-full my-5 text-xl font-bold bg-gradient-to-r from-blue-50 to-blue-100 shadow-md' onClick={handleEnroll}>
                                Request Pending
                            </button>}
                            {/* <h1 className='text-3xl font-extrabold'>Rs. 500</h1> */}
                        </div>
                    </div>
                    <CourseVideoContainer courseId={course._id} />
                    {/* {fullScreenVideo && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black z-50">
                            <video id="fullscreen-video" src={fullScreenVideo} className="w-full h-full" controls autoPlay />
                            <button className="absolute top-5 right-5 text-white" onClick={handleCloseFullScreen}>Close</button>
                        </div>
                    )} */}
                </section>
            )}
        </>
    )
}
