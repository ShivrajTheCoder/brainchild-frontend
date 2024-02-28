import React, { useState } from 'react';

const WatchedVideoContainer = ({ videos }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleOpenModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFeedback('');
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Here you can handle the submission of feedback
    console.log('Feedback submitted for video:', selectedVideo.title, '-', feedback);
    // Clear the feedback input after submission
    setFeedback('');
    // Close the modal after submission
    setShowModal(false);
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
            <h3 className="text-lg font-semibold mb-4">Add Feedback for {selectedVideo.title}</h3>
            <form onSubmit={handleSubmitFeedback}>
              <textarea
                className="w-full h-32 border rounded p-2 mb-4"
                placeholder="Enter your feedback"
                value={feedback}
                onChange={handleFeedbackChange}
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 mr-2 rounded"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchedVideoContainer;

