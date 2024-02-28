import React, { useState } from 'react';
import FeedbackForm from './ParentForms/FeedbackForm';


const WatchedVideoContainer = ({ videos }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleOpenModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitFeedback = (video, feedback) => {
    console.log('Feedback submitted for video:', video.title, '-', feedback);
    // Here you can handle the submission of feedback
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-4">Watched Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map(video => (
          <div key={video._id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{video.description.substring(0, 100)}...</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => handleOpenModal(video)}
            >
              Add Feedback
            </button>
            {/* Additional video details can be added here */}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <FeedbackForm
              selectedVideo={selectedVideo}
              onClose={handleCloseModal}
              onSubmit={handleSubmitFeedback}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchedVideoContainer;
