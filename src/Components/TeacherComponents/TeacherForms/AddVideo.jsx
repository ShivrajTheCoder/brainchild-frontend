import React, { useState } from 'react';
import Input from '../../Input';
import Textarea from '../../Textarea';
import axios from 'axios';

const AddVideoForm = ({ courseId, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // console.log(apiUrl);
  const [formData, setFormData] = useState({
    videoTitle: '',
    videoDescription: '',
    thumbnail: null, // for thumbnail image file
    video: null // for video file
  });
  const [valErrors, setValErrors] = useState({
    title: "",
    description: "",
    thumbnail: "",
    video: ''
  });
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === 'file' ? event.target.files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.videoTitle.length < 4) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title must be at least 4 characters long"
      }));
      return;
    }

    // Validate description length
    if (formData.videoDescription.length < 20) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description must be at least 20 characters long"
      }));
      return;
    }

    // Validate thumbnail and video files
    if (!formData.thumbnail) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        thumbnail: "Thumbnail is required"
      }));
      return;
    }

    if (!formData.video) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        video: "Video file is required"
      }));
      return;
    }
    const data = new FormData();
    data.append('title', formData.videoTitle);
    data.append('description', formData.videoDescription);
    data.append('thumbnail', formData.thumbnail);
    data.append('video', formData.video);
    data.append('author', "6578af9de664acfdcff9e0b4");
    data.append('course', "65df5ae0f79eb95a87af21ea");

    try {
      const response = await axios.post(`${apiUrl}/teacher/uploadvideo`, data);
      console.log(response.data); // Handle response data as needed
      // onClose(); // Close modal after successful upload
    } catch (error) {
      console.error('Error uploading video:', error);
      // Handle error, show message to the user, etc.
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-80 overflow-y-auto">
      {/* <h2 className="text-lg font-semibold mb-4">Add Video for Course</h2> */}
      <form onSubmit={handleSubmit}>
        <Input
          label="Video Title:"
          name="videoTitle"
          type="text"
          value={formData.videoTitle}
          onChange={handleChange}
          placeholder="Enter video title"
          error={valErrors.title} // Pass validation error for title
        />
        <Textarea
          label="Video Description:"
          name="videoDescription"
          value={formData.videoDescription}
          onChange={handleChange}
          placeholder="Enter video description"
          error={valErrors.description} // Pass validation error for description
        />
        <div className='w-full h-fit py-3 flex flex-col'>
          <label className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-green-500 text-white font-semibold " htmlFor="thumbnail">
            Choose Thumbnail
            <input
              className="hidden"
              id="thumbnail"
              name="thumbnail"
              type="file"
              onChange={handleChange}
              accept="image/*"
            />
          </label>
          {formData.thumbnail && <p>{formData.thumbnail.name}</p>}
          {valErrors.thumbnail && <p className='text-red-500'>{valErrors.thumbnail}</p>}
        </div>
        <div className='w-full h-fit py-3 flex flex-col'>
          <label className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-green-500 text-white font-semibold " htmlFor="video">
            Choose Video
            <input
              className="hidden"
              id="video"
              name="video"
              type="file"
              onChange={handleChange}
              accept="video/*"
            />
          </label>
          {formData.video && <p>{formData.video.name}</p>}
          {valErrors.video && <p className='text-red-500'>{valErrors.video}</p>}
        </div>
        <div className="flex justify-end mt-4">
          <button type="submit" className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Video</button>
          <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddVideoForm;
