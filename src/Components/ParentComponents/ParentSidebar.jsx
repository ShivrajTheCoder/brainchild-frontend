import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ParentSidebar = () => {

  const navigate=useNavigate();
  return (
    <div className="bg-gray-200 w-1/4 h-screen flex flex-col  p-4">
      <h2 className="text-xl font-semibold mb-4 cursor-pointer" onClick={()=>navigate("/parentdashboard")}>Parent Dashboard</h2>
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
      <Link to={"/parentdashboard/montioractivities"}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded my-1"
      >
        Monitor Activities
      </Link>
      <Link to={"/parentdashboard/testreports"}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded my-1"
      >
        Test Reports
      </Link>
    
    </div>
  );
};

export default ParentSidebar;
