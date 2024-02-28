import React, { useState } from 'react';

const ParentSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Here you can handle the submission of feedback
    console.log('Feedback submitted:', feedback);
    // Clear the feedback input after submission
    setFeedback('');
    // Close the modal after submission
    setShowModal(false);
  };

  return (
    <div className="bg-gray-200 w-1/4 h-screen flex flex-col  p-4">
      <h2 className="text-xl font-semibold mb-4">Parent Sidebar</h2>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={handleOpenModal}
      >
        Add Suggestion
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-8 z-50">
            <h3 className="text-lg font-semibold mb-4">Add Feedback</h3>
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

export default ParentSidebar;
