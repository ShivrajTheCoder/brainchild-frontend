import React from 'react';

import TeacherCoursesContainer from '../../Components/TeacherComponents/TeacherCoursesContainer';
import TeacherVideoContainer from '../../Components/TeacherComponents/TeacherVideoContainer';
import TeacherSidebar from './../../Components/Layout/TeacherSidebar';
import { Outlet } from 'react-router-dom';


export default function TeacherDashboard() {
    return (
        <div className="flex">
            <TeacherSidebar />
            <div className="flex-1 overflow-y-scroll h-screen ">
                <Outlet />
            </div>
        </div>
    );
}
