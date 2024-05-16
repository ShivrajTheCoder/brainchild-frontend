import React, { useState } from 'react';
import AddCourseForm from '../TeacherComponents/TeacherForms/AddCourseForm';
import { Link } from 'react-router-dom';


export default function TeacherSidebar() {
  return (
    <div className="bg-gray-200 h-screen w-1/4 p-4">
      <h2 className="text-xl font-semibold mb-4">Shivraj Teacher</h2>
      <ul>
        <li className="mb-2">
          <Link to={"/teacherdashboard/addtest"} className="text-left w-full bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded block" >
            Add Test
          </Link>
        </li>
        <li className="mb-2">
          <Link to={"/teacherdashboard/addcourse"} className="text-left w-full bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded block" >
            Add Couse
          </Link>
        </li>
      </ul>
    
    </div>
  );
}
