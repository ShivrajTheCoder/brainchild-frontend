import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ParentSidebar = () => {


  return (
    <div className="bg-gray-200 w-1/4 h-screen flex flex-col  p-4">
      <h2 className="text-xl font-semibold mb-4">Parent Sidebar</h2>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded my-1"
      >
        Add Suggestion
      </button>
      <Link to={"/parentdashboard/courserequests"}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded my-1"
      >
        View Course Requests
      </Link>
    
    </div>
  );
};

export default ParentSidebar;
