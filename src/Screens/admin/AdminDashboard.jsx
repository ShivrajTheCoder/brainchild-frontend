import React from 'react'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import AdminInfoContainer from '../../Components/AdminComponents/AdminInfoContainer'
import ApprovalVideoContainer from '../../Components/AdminComponents/ApprovalVideoContainer'
const videos = [
  {
    "_id": "6578b3a67a877289b8deee83",
    "title": "Introduction to React",
    "description": "This video provides an introduction to React, a popular JavaScript library for building user interfaces. Learn the basics of React components, state, and props.",
    "author": "6578af9de664acfdcff9e0b4",
    "approved": true,
    "course": "6578b3a67a877289b8deee83",
    "likes": 10,
    "__v": 0
  },
  // Add more videos here
  {
    "_id": "6578b3a67a877289b8deee84",
    "title": "JavaScript Fundamentals",
    "description": "This video covers the fundamental concepts of JavaScript programming language. Learn about variables, data types, control structures, functions, and more.",
    "author": "6578af9de664acfdcff9e0b4",
    "approved": true,
    "course": "6578b3a67a877289b8deee83",
    "likes": 15,
    "__v": 0
  },
  {
    "_id": "6578b3a67a877289b8deee85",
    "title": "Node.js Basics",
    "description": "This video introduces Node.js, a runtime environment for executing JavaScript code outside the browser. Learn about event-driven architecture, modules, and building server-side applications.",
    "author": "6578af9de664acfdcff9e0b4",
    "approved": true,
    "course": "6578b3a67a877289b8deee83",
    "likes": 20,
    "__v": 0
  },
  {
    "_id": "6578b3a67a877289b8deee86",
    "title": "CSS Flexbox Layout",
    "description": "This video demonstrates how to use CSS Flexbox for creating flexible layouts. Learn about flex containers, flex items, and various flex properties.",
    "author": "6578af9de664acfdcff9e0b4",
    "approved": true,
    "course": "6578b3a67a877289b8deee83",
    "likes": 12,
    "__v": 0
  }
];
export default function AdminDashboard() {
  return (
    <section className='flex'>
      <AdminSidebar />
      <div className=' w-3/4 '>
        <AdminInfoContainer />
        <ApprovalVideoContainer videos={videos} />
      </div>
    </section>
  )
}
