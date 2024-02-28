import React, { useState } from 'react';
import Input from '../../Input';
import Textarea from '../../Textarea';

const AddVideoForm = ({ courseId, onClose }) => {
  const [formData, setFormData] = useState({
    videoUrl: '',
    videoTitle: '',
    videoDescription: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    // You can add your logic here to submit the form data
    // After submission, close the modal
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Add Video for Course</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Video URL:"
          name="videoUrl"
          type="text"
          value={formData.videoUrl}
          onChange={handleChange}
          placeholder="Enter video URL"
        />
        <Input
          label="Video Title:"
          name="videoTitle"
          type="text"
          value={formData.videoTitle}
          onChange={handleChange}
          placeholder="Enter video title"
        />
        <Textarea
          label="Video Description:"
          name="videoDescription"
          value={formData.videoDescription}
          onChange={handleChange}
          placeholder="Enter video description"
        />
        <div className="flex justify-end">
          <button type="submit" className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Video</button>
          <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddVideoForm;
