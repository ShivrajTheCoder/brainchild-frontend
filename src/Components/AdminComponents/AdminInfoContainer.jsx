import React from 'react';

const AdminInfoContainer = () => {
  // Dummy data
  const numStudents = 150;
  const numTeachers = 25;
  const numParents = 70;
  const numTests = 15;

  return (
    <div className=" p-4  mt-4">
      <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Number of Students</h3>
          <p className="text-sm text-gray-600 mb-2">{numStudents}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Number of Teachers</h3>
          <p className="text-sm text-gray-600 mb-2">{numTeachers}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Number of Parents</h3>
          <p className="text-sm text-gray-600 mb-2">{numParents}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Number of Tests</h3>
          <p className="text-sm text-gray-600 mb-2">{numTests}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoContainer;
