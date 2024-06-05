import React from 'react';
import { Link } from 'react-router-dom';
import { GiBrain } from "react-icons/gi";
import { FaWpexplorer } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { MdAccessTimeFilled } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { BsFillMortarboardFill } from "react-icons/bs";
export default function UserSidebar({ totalTime }) {
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className=" bg-[#00b4d8] text-white min-h-screen w-1/4 p-4">
      <div className='flex flex-row'>
        <GiBrain color='gray' size={25} />
        <h2 className=' text-xl mx-2 font-extrabold text-black'>Brain Child</h2>
      </div>
      <div className='flex justify-center my-3'>
        <div className=' flex justify-center items-center h-24 w-24 rounded-full border-2 border-white'>
          <span className="block text-lg font-bold ">{formatTime(totalTime)}</span>
        </div>
      </div>
      <Link to="/" className='flex items-center bg-[#14213d] mb-2 text-white py-2 px-4 rounded-md text-bold text-lg  '>
        <FaWpexplorer className='mx-2' />  Explore Courses
      </Link>
      <Link to="/mycourses" className='flex items-center bg-[#14213d] mb-2 text-white py-2 px-4 rounded-md text-bold text-lg  '>
        <FaBook className='mx-2' />  My Courses
      </Link>
      <Link to="/upcomingtests" className='flex items-center bg-[#14213d] mb-2 text-white py-2 px-4 rounded-md text-bold text-lg  '>
        <PiExamFill className='mx-2' /> Available Tests
      </Link>
      <Link to="/myreport" className='flex items-center bg-[#14213d] mb-2 text-white py-2 px-4 rounded-md text-bold text-lg  '>
        <MdAccessTimeFilled className='mx-2' />  My Reports
      </Link>
      <Link to="/mytestreport" className='flex items-center bg-[#14213d] mb-2 text-white py-2 px-4 rounded-md text-bold text-lg  '>
        <TbReportSearch className='mx-2' />  My Test Reports
      </Link>

      <div className=' bg-white text-gray-500 p-5 rounded-md flex'>
          <div className='mr-2'> <BsFillMortarboardFill className='mx-2' size={50}/></div>
          <div>
            <span>50K+</span>
            <p>Students and Parents trust us.</p>
          </div>
      </div>
    </div>
  );
}
