import React from 'react';

const EnrolledCoursesContainer = ({ enrolledCourses }) => {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {enrolledCourses.map(course => (
          <div key={course._id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{course.description.substring(0, 100)}...</p>
            {/* Additional course details can be added here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCoursesContainer;
