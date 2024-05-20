import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="bg-gray-200 h-screen w-1/4 p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
      <Link
        to="/admindashboard/pendingvideos"
        className="text-left w-full bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded mb-2 block"
      >
        Pending Videos
      </Link>
      <Link
        to="/admindashboard/pendingcourses"
        className="text-left w-full bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded mb-2 block"
      >
        Pending Courses
      </Link>
    </div>
  );
};

export default AdminSidebar;
