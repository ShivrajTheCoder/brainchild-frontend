import React from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import AdminInfoContainer from '../../Components/AdminComponents/AdminInfoContainer'
import ApprovalVideoContainer from '../../Components/AdminComponents/ApprovalVideoContainer'
import { Outlet } from 'react-router-dom';
export default function AdminDashboard() {
  return (
    <section className='flex'>
      <AdminSidebar />
      <div className="flex-1 overflow-y-scroll h-screen ">
        <Outlet />
      </div>
    </section>
  )
}
