import React, { useEffect } from 'react';
import ParentSidebar from '../../Components/ParentComponents/ParentSidebar';
import EnrolledCoursesContainer from "../../Components/ParentComponents/EnrolledCousesContainer";
import WatchedVideoContainer from "../../Components/ParentComponents/WatchedVideoContainer";
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChildRequestForm from '../../Components/ParentComponents/ParentForms/ChildRequestForm';

const ParentDashboard = () => {
  const parent = useSelector((state) => state.parent);
  const { userId, token, isLoggedIn, childId } = parent;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/parentlogin');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex">
      {childId ? (
        <>
          <ParentSidebar />
          <div className="flex-1 overflow-y-scroll h-screen">
            <Outlet />
          </div>
        </>
      ) : (
        <ChildRequestForm />
      )}
    </div>
  );
};

export default ParentDashboard;
