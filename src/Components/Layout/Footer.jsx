// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-sm">Your Edu-Tech is dedicated to providing quality education to learners worldwide. Join us in the journey of knowledge!</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <ul className="text-sm">
              <li><a href="#home">Home</a></li>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Courses</h2>
            <ul className="text-sm">
              <li><a href="#programming">Programming</a></li>
              <li><a href="#math">Mathematics</a></li>
              <li><a href="#science">Science</a></li>
              <li><a href="#languages">Languages</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm">123 Education Street<br />City, Country<br />Email: info@youredu-tech.com</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm">&copy; 2023 Your Edu-Tech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
