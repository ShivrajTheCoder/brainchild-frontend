import React from 'react';

export default function Sidebar() {
  return (
    <div className="bg-gray-200 h-screen w-1/4 p-4">
      <h2 className="text-xl font-semibold mb-4">Shivraj Teacher</h2>
      <ul>
        <li className="mb-2">
          <button className="text-left w-full bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded">Add Video</button>
        </li>
        <li className="mb-2">
          <button className="text-left w-full bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded">Add Course</button>
        </li>
        {/* Add more sidebar options here */}
      </ul>
    </div>
  );
}
