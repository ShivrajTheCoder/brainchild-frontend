import React from 'react';
import ParentSidebar from '../../Components/ParentComponents/ParentSidebar';
import EnrolledCoursesContainer from "../../Components/ParentComponents/EnrolledCousesContainer"
import WatchedVideoContainer from "../../Components/ParentComponents/WatchedVideoContainer"
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChildRequestForm from '../../Components/ParentComponents/ParentForms/ChildRequestForm';
const ParentDashboard = () => {
  const parent = useSelector((state) => state.parent)
  console.log(parent, "here is the parent");
  const { userId, token, isLoggedIn, childId } = parent;
  return (
    <div className="flex">
      {
        childId && <>
          <ParentSidebar />
          <div className="flex-1 overflow-y-scroll h-screen ">
            <Outlet />
          </div>
        </>
      }
      {
        !childId && <ChildRequestForm/>
      }
    </div>
  );
};

export default ParentDashboard;
