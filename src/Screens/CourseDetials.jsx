import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../BASE_URL';
import LoadingComponent from "../Components/LoaingComponent";
import ErrorComponent from '../Components/ErrorComponent';
export default function CourseDetials() {
    const { courseId } = useParams();
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = BASE_URL;
    const defaultImageUrl = 'data:image/jpeg;base64,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';
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
        }
        fetchCourse();
        setLoading(false);
    }, [courseId])
    return (
        <>
            {
                loading && <LoadingComponent />
            }
            {
                error && <ErrorComponent message={error} />
            }
            {
                !loading && !error && course &&
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
                        <img src={defaultImageUrl} alt="course image" className='h-64 absolute top-20 right-8 rounded-lg' />
                    </div>
                    <div className=' my-10 mx-10 grid grid-cols-3'>
                        <p className='px-8 text-lg border py-8 mx-3 col-span-2'>{course.description}</p>
                        <div className='w-full flex flex-col-reverse px-5 py-3'>
                            <button className='py-3 px-5 border w-full my-5 text-xl font-bold bg-gradient-to-r from-blue-50 to-blue-100 shadow-md'>
                                Enroll Now
                            </button>
                            <h1 className='text-3xl font-extrabold'>Rs. 1,500</h1>

                        </div>
                    </div>
                    <section className="mx-10">
                        <h1 className="font-bold text-2xl">Course Content</h1>
                        <div className='grid grid-cols-3 gap-6'>
                            <div className="mt-4 col-span-2 my-5">
                                <table className="min-w-full divide-y divide-gray-200 my-5">
                                    <thead className="bg-gray-50 ">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left  text-gray-500 uppercase tracking-wider text-xl font-bold">
                                                Video Title
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y border divide-gray-200 font-bold">
                                        {/* Example rows, replace this with your data */}
                                        <tr className="bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Video 1 Title
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Video 2 Title
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Video 1 Title
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Video 2 Title
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Video 1 Title
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Video 2 Title
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Video 1 Title
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Video 2 Title
                                            </td>
                                        </tr>
                                        

                                        {/* Add more rows as needed */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                </section>
            }

        </>
    )
}
