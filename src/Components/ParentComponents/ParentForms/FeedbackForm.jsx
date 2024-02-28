import React, { useState } from 'react';
import Textarea from '../../Textarea';

const FeedbackForm = ({ selectedVideo, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (value) => {
    setFeedback(value);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    onSubmit(selectedVideo, feedback);
    setFeedback('');
    onClose();
  };

  return (
    <div className="bg-white rounded-lg p-8">
      <h3 className="text-lg font-semibold mb-4">Add Feedback for {selectedVideo.title}</h3>
      <form onSubmit={handleSubmitFeedback}>
        <Textarea
          id="feedbackTextarea"
          name="feedback"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Enter your feedback"
        />
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 mr-2 rounded"
            onClick={onClose}
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
  );
};

export default FeedbackForm;
