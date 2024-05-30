import React from 'react';
import { Link } from 'react-router-dom';

export default function UserSidebar({ totalTime }) {
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="bg-gray-200 h-screen w-1/4 p-4">
      <div className="mb-4">
        <span className="block text-lg font-bold">Online Time: {formatTime(totalTime)}</span>
      </div>
      <Link to="/" className='block bg-[#14213d] mb-2 text-white py-2 px-4 rounded-md text-bold text-lg'>
        Explore Courses
      </Link>
      <Link to="/mycourses" className='block bg-[#14213d] mb-2 text-white py-2 px-4 rounded-md text-bold text-lg'>
        My Courses
      </Link>
      <Link to="/upcomingtests" className='block bg-[#14213d] mb-2 text-white py-2 px-4 rounded-md text-bold text-lg'>
        Upcoming Tests
      </Link>
      <Link to="/myreport" className='block bg-[#14213d] mb-2 text-white py-2 px-4 rounded-md text-bold text-lg'>
        My Reports
      </Link>
    </div>
  );
}
