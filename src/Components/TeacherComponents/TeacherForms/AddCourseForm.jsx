import React, { useState } from 'react';
import Input from '../../Input';
import Textarea from '../../Textarea';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddCourseForm = () => {
  const teacher = useSelector((state) => state.teacher);
  const { isLoggedIn, userId } = teacher;
  console.log(teacher)
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    courseTitle: '',
    courseDescription: '',
    courseThumbnail: null,
  });
  const [valErrors, setValErrors] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === 'file' ? event.target.files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.courseTitle.length < 4) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title must be at least 4 characters long"
      }));
      return;
    }

    if (formData.courseDescription.length < 20) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description must be at least 20 characters long"
      }));
      return;
    }

    if (!formData.courseThumbnail) {
      setValErrors((prevErrors) => ({
        ...prevErrors,
        thumbnail: "Thumbnail is required"
      }));
      return;
    }

    const data = new FormData();
    data.append('name', formData.courseTitle);
    data.append('description', formData.courseDescription);
    data.append('thumbnail', formData.courseThumbnail);
    data.append('author', userId);
    try {
      const response = await axios.post(`${apiUrl}/courses/createcourse`, data);
      if (response.status === 201) {
        console.log("Successs");
        // onClose(); 
        setFormData({
          courseTitle: '',
          courseDescription: '',
          courseThumbnail: null,
        })
      }
      else {
        console.log("error");
      }
      console.log(response.data); // Handle response data as needed
    } catch (error) {
      console.error('Error adding course:', error);
      // Handle error, show message to the user, etc.
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-y-auto">
      <form onSubmit={handleSubmit}>
        <Input
          label="Course Title:"
          name="courseTitle"
          type="text"
          value={formData.courseTitle}
          onChange={handleChange}
          placeholder="Enter course title"
          error={valErrors.title}
        />
        <Textarea
          label="Course Description:"
          name="courseDescription"
          value={formData.courseDescription}
          onChange={handleChange}
          placeholder="Enter course description"
          error={valErrors.description}
        />
        <div className='w-full h-fit py-3 flex flex-col'>
          <label className="shadow appearance-none border rounded w-fit py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-green-500 text-white font-semibold " htmlFor="courseThumbnail">
            Choose Thumbnail
            <input
              className="hidden"
              id="courseThumbnail"
              name="courseThumbnail"
              type="file"
              onChange={handleChange}
              accept="image/*"
            />
          </label>
          {formData.courseThumbnail && <p>{formData.courseThumbnail.name}</p>}
          {valErrors.thumbnail && <p className='text-red-500'>{valErrors.thumbnail}</p>}
        </div>
        <div className="flex justify-end mt-4">
          <button type="submit" className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Course</button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm;
