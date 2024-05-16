import React from 'react';

import TeacherCoursesContainer from '../../Components/TeacherComponents/TeacherCoursesContainer';
import TeacherVideoContainer from '../../Components/TeacherComponents/TeacherVideoContainer';
import TeacherSidebar from './../../Components/Layout/TeacherSidebar';
import { Outlet } from 'react-router-dom';


export default function TeacherDashboard() {
    const courses =
        [
            {
                "_id": "6578b3a67a877289b8deee83",
                "name": "Introduction to Programming",
                "description": "This course provides a comprehensive introduction to the world of programming. Whether you're a complete beginner or looking to enhance your coding skills, this course covers the fundamental concepts of programming, including variables, data types, control structures, and functions. You'll also get hands-on experience by working on practical coding exercises and projects. Join us on this exciting journey into the world of programming and unleash your potential as a developer!",
                "videos": [],
                "author": "6578af9de664acfdcff9e0b4",
                "enrolled": 0,
                "approved": false,
                "__v": 0
            },
            {
                "_id": "6578b3b27a877289b8deee86",
                "name": "Web Development Bootcamp",
                "description": "Embark on a journey to become a skilled web developer with our comprehensive bootcamp! This course covers everything from HTML and CSS basics to advanced JavaScript and popular web frameworks like React. You'll build real-world projects, learn about responsive design, and understand the principles of backend development. Join us and dive into the exciting world of web development!",
                "videos": [],
                "author": "6578af9de664acfdcff9e0b4",
                "enrolled": 0,
                "approved": false,
                "__v": 0
            },
            {
                "_id": "6578b3bb7a877289b8deee89",
                "name": "Introduction to Data Science",
                "description": "Unlock the power of data with our Introduction to Data Science course. Explore the foundations of statistics, data analysis, and machine learning. Gain hands-on experience with popular data science tools and libraries, and work on projects that simulate real-world scenarios. Whether you're a data enthusiast or looking to pursue a career in data science, this course provides the essential skills and knowledge to thrive in the field.",
                "videos": [],
                "author": "6578af9de664acfdcff9e0b4",
                "enrolled": 0,
                "approved": false,
                "__v": 0
            },
            {
                "_id": "6578b3e47a877289b8deee8e",
                "name": "Graphic Design Mastery",
                "description": "Unleash your creativity and master the art of graphic design! This comprehensive course covers design principles, color theory, typography, and industry-standard tools like Adobe Photoshop and Illustrator. Dive into hands-on projects, create stunning visual assets, and build a portfolio that showcases your design skills. Whether you're a beginner or looking to enhance your design expertise, this course is your gateway to the exciting world of graphic design.",
                "videos": [],
                "author": "6578af9de664acfdcff9e0b4",
                "enrolled": 0,
                "approved": false,
                "__v": 0
            },
        ]


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

    return (
        <div className="flex">
            <TeacherSidebar />
            <div className="flex-1 overflow-y-scroll h-screen ">
                <Outlet />
            </div>
        </div>
    );
}
