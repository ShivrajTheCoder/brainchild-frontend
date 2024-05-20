import React, { useEffect, useState } from 'react';
import Input from '../../Input';
import Textarea from '../../Textarea';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddVideoForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const authorId = '6578af9de664acfdcff9e0b4';
  const [formData, setFormData] = useState({
    videoTitle: '',
    videoDescription: '',
    thumbnail: null, // for thumbnail image file
    video: null, // for video file
    course: '' // for selected course
  });
  const [valErrors, setValErrors] = useState({
    title: "",
    description: "",
    thumbnail: "",
    video: ''
  });

  useEffect(() => {
    const fetchCourses = async () => {
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}/teacher/getallteachercourse/${authorId}`);
        if (response.status === 200) {
          setCourses(response.data.courses);
        }
      } catch (error) {
        console.log(error);
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === 'file' ? event.target.files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValErrors({
      title: "",
      description: "",
      thumbnail: "",
      video: ''
    })
    if (formData.videoTitle.length < 4) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title must be at least 4 characters long"
      }));
      toast.error("Title must be at least 4 characters long");
      return;
    }

    // Validate description length
    if (formData.videoDescription.length < 20) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description must be at least 20 characters long"
      }));
      toast.error("Description must be at least 20 characters long");
      return;
    }

    // Validate thumbnail and video files
    if (!formData.thumbnail) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        thumbnail: "Thumbnail is required"
      }));
      toast.error("Thumbnail is required");
      return;
    }

    if (!formData.video) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        video: "Video file is required"
      }));
      toast.error("Video file is required");
      return;
    }

    // Validate course selection
    if (!formData.course) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        course: "Course is required"
      }));
      toast.error("Course is required");
      return;
    }

    const data = new FormData();
    data.append('title', formData.videoTitle);
    data.append('description', formData.videoDescription);
    data.append('thumbnail', formData.thumbnail);
    data.append('video', formData.video);
    data.append('author', authorId);
    data.append('course', formData.course);

    try {
      const response = await axios.post(`${apiUrl}/teacher/uploadvideo`, data);
      if (response.status === 201) {
        toast.success('Video added successfully!');
        setFormData({
          videoTitle: '',
          videoDescription: '',
          thumbnail: null, // for thumbnail image file
          video: null, // for video file
          course: '' // for selected course
        })
        document.getElementById('thumbnail').value = null;
        document.getElementById('video').value = null;
      } else {
        toast.error('Failed to add video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Error uploading video');
    }
  };

  return (
    <div className="p-6 h-screen mb-20">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-3 gap-5'>
          <Input
            label="Video Title:"
            name="videoTitle"
            type="text"
            value={formData.videoTitle}
            onChange={handleChange}
            placeholder="Enter video title"
            error={valErrors.title} // Pass validation error for title
          />
          <div className='w-full h-fit py-3 flex flex-col justify-center items-center mt-2'>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="mt-2 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a course</option>
              {loading ? (
                <option value="" disabled>Loading...</option>
              ) : error ? (
                <option value="" disabled>{error}</option>
              ) : (
                courses.map(course => (
                  <option key={course._id} value={course._id}>{course.name}</option>
                ))
              )}
            </select>
            {valErrors.course && <p className='text-red-500'>{valErrors.course}</p>}
          </div>
        </div>

        <Textarea
          label="Video Description:"
          name="videoDescription"
          value={formData.videoDescription}
          onChange={handleChange}
          placeholder="Enter video description"
          error={valErrors.description} // Pass validation error for description
        />
        <div className='grid grid-cols-4 gap-5'>
          <div className='w-full h-fit py-3 flex flex-col'>
            <label className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-green-500 text-white font-semibold" htmlFor="thumbnail">
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
            <label className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-yellow-500 text-white font-semibold" htmlFor="video">
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
        </div>

        <div className="flex justify-end mt-4">
          <button type="submit" className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Video</button>
        </div>
      </form>
    </div>
  );
};

export default AddVideoForm;
