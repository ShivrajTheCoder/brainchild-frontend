import React from 'react';
import { Link } from 'react-router-dom';

export default function UserSidebar() {
    return (
        <div className="bg-gray-200 h-screen w-1/4 p-4">
            <Link to={"/"} className='block bg-[#14213d] text-white py-2 px-4 rounded-md text-bold text-lg'>
                Explore Courses
            </Link>
        </div>
    );
}
