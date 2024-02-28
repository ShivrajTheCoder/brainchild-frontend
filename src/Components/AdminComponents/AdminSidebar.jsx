import React, { useState } from 'react';

const AdminSidebar = () => {
  const [removeTeacherModalOpen, setRemoveTeacherModalOpen] = useState(false);
  const openRemoveTeacherModal = () => {
    setRemoveTeacherModalOpen(true);
  };

  const closeRemoveTeacherModal = () => {
    setRemoveTeacherModalOpen(false);
  };

  return (
    <div className="bg-gray-200 h-screen w-1/4 p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
      <button 
        onClick={openRemoveTeacherModal}
        className="text-left w-full bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded mb-2"
      >
        Remove Teacher
      </button>

      {removeTeacherModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Remove Teacher</h3>
            <p>Are you sure you want to remove this teacher?</p>
            <div className="flex justify-end mt-4">
              <button 
                onClick={closeRemoveTeacherModal}
                className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button 
                // onClick=
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add modals for other actions if needed */}
    </div>
  );
};

export default AdminSidebar;
