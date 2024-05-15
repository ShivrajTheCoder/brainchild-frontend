import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../BASE_URL'
import LoadingComponent from "../LoaingComponent";
import ErrorComponent from '../ErrorComponent';
import CourseCard from './CourseCard';
export default function CoursesContainer() {
    const apiUrl = BASE_URL;
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setError(null);
        const getCourses = async () => {
            try {
                const resp = await axios.get(`${apiUrl}/courses/getallcourses`);
                console.log(resp.data.courses);
                setCourses(resp.data.courses)
            }
            catch (error) {
                setError("Something went wrong!");
            }

        }
        getCourses();
        setLoading(false);
    }, [])
    return (
        <>
            {
                loading && <LoadingComponent />
            }
            {
                error && <ErrorComponent message={error} />
            }
            {
                !loading && !error &&
                <div className='grid grid-cols-3 gap-3 w-fit'>
                    {
                        courses.map(course => (
                            <CourseCard key={course._id} course={course} />
                        ))
                    }
                </div>
            }
        </>
    )
}
