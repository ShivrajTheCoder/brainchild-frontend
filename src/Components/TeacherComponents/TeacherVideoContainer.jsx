import React from 'react';

const TeacherVideoContainer = ({ videos }) => {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-4">Your Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map(video => (
          <div key={video._id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{video.description.substring(0, 100)}...</p>
            <p className="text-sm text-gray-600 mb-2">Likes: {video.likes}</p>
            {/* Additional video details can be added here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherVideoContainer;
