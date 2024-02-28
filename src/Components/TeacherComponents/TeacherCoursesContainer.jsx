import React, { useState } from 'react';
import AddVideoForm from './TeacherForms/AddVideo';

const TeacherCoursesContainer = ({ courses }) => {
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const toggleAddVideoModal = (course) => {
    setSelectedCourse(course);
    setShowAddVideoModal(!showAddVideoModal);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map(course => (
          <div key={course._id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
            <button>
              {course.approved ? "Approved" : "Pending"}
            </button>
            <p>Total Enrollment: {course.enrolled}</p>
            <button className="bg-green-500 px-3 py-1 text-white rounded-sm shadow-md" onClick={() => toggleAddVideoModal(course)} >Add Video</button>
          </div>
        ))}
      </div>
      {/* AddVideoForm Modal */}
      {showAddVideoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Add Video for {selectedCourse.name}</h2>
            <AddVideoForm courseId={selectedCourse._id} onClose={() => setShowAddVideoModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCoursesContainer;
