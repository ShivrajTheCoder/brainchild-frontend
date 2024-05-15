import React, { useState } from 'react';
import AddCourseForm from './TeacherForms/AddCourseForm';


export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-200 h-screen w-1/4 p-4">
      <h2 className="text-xl font-semibold mb-4">Shivraj Teacher</h2>
      <ul>
        <li className="mb-2">
          <button className="text-left w-full bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded">Add Video</button>
        </li>
        <li className="mb-2">
          <button onClick={openModal} className="text-left w-full bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded">Add Course</button>
        </li>
        {/* Add more sidebar options here */}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <AddCourseForm onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
