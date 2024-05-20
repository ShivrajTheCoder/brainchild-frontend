import React from 'react';
import ParentSidebar from '../../Components/ParentComponents/ParentSidebar';
import EnrolledCoursesContainer from "../../Components/ParentComponents/EnrolledCousesContainer"
import WatchedVideoContainer from "../../Components/ParentComponents/WatchedVideoContainer"
import { Outlet } from 'react-router-dom';
const ParentDashboard = () => {
  return (
    <div className="flex">
      <ParentSidebar />
      <div className="flex-1 overflow-y-scroll h-screen ">
        <Outlet />
      </div>
    </div>
  );
};

export default ParentDashboard;
