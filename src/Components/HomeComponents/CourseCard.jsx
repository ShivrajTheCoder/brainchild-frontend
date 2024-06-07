import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
};

const CourseCard = ({ course, descriptionWordLimit = 10 }) => {
    const { name, description, enrolled, videos, thumbnail } = course;
    const defaultImageUrl = thumbnail || 'https://res.cloudinary.com/dushmacr8/image/upload/v1686558011/samples/people/jazz.jpg';
    const truncatedDescription = truncateDescription(description, descriptionWordLimit);

    return (
        <div className="relative bg-white mb-4 rounded shadow-md ">
            <div className="mb-4">
                <img
                    src={defaultImageUrl}
                    alt="Course Image"
                    className="w-full h-32 object-cover rounded-t"
                />
            </div>
            <div className='p-3'>
                <h2 className="text-2xl font-bold mb-2">{name}</h2>
                <p className="text-gray-600 mb-4">{truncatedDescription}</p>
                <div className="flex items-center justify-between mb-4">
                    <div className='flex flex-col text-gray-500'>
                        <span > {enrolled} students</span>
                        {/* <span className="">{videos.length}+ videos</span> */}
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 p-3">
                <Link to={`/course/${course._id}`} className='flex items-center text-blue-700' >Exlore <FaArrowRightLong color='blue' className='mx-2' /></Link>
            </div>
        </div>
    );
};

export default CourseCard;
