import React, { useEffect } from 'react';
import TeacherCoursesContainer from '../../Components/TeacherComponents/TeacherCoursesContainer';
import TeacherVideoContainer from '../../Components/TeacherComponents/TeacherVideoContainer';
import TeacherSidebar from './../../Components/Layout/TeacherSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function TeacherDashboard() {
    const teacher = useSelector((state) => state.teacher);
    const { isLoggedIn,userId } = teacher;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/teacherlogin');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="flex">
            <TeacherSidebar />
            <div className="flex-1 overflow-y-scroll h-screen ">
                <Outlet />
            </div>
        </div>
    );
}
