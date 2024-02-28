import React from 'react';
import { Link } from 'react-router-dom';

const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
};

const CourseCard = ({ course, descriptionWordLimit = 20 }) => {
    const { name, description, enrolled, videos } = course;
    const defaultImageUrl = 'https://res.cloudinary.com/dushmacr8/image/upload/v1686558011/samples/people/jazz.jpg';
    const truncatedDescription = truncateDescription(description, descriptionWordLimit);

    return (
        <div className="bg-white p-4 mb-4 rounded shadow-md">
            <div className="mb-4">
                <img
                    src={defaultImageUrl}
                    alt="Course Image"
                    className="w-full h-32 object-cover rounded"
                />
            </div>
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p className="text-gray-600 mb-4">{truncatedDescription}</p>
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-gray-500">Enrolled: {enrolled}</span>
                </div>
                <div>
                    <span className="text-blue-500">Videos: {videos.length}</span>
                </div>
            </div>
            <div className='flex items-end justify-between w-full text-lg font-bold my-3'>
                <Link to={`/course/${course._id}`} className='bg-black text-white py-2 px-5 rounded-md shadow-lg'>Show Details</Link>
            </div>

        </div>
    );
};

export default CourseCard;
