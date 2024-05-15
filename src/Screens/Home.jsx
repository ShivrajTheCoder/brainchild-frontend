import React from 'react'

import UserSidebar from '../Components/Layout/UserSidebar'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div className='flex'>
      <UserSidebar />
      <div className="flex-1 overflow-y-scroll h-screen ">
        <Outlet/>
      </div>
    </div>
  )
}
