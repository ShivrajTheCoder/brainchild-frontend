import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

export default function TeacherInfo() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authorId = '6578af9de664acfdcff9e0b4';

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}/teacher/getteacherinfo/${authorId}`);
        if (response.status === 200) {
          setTeacherInfo(response.data);
        }
      } catch (error) {
        setError('Failed to fetch teacher info');
        toast.error('Failed to fetch teacher info');
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherInfo();
  }, [apiUrl, authorId]);

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Teacher Info</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <AnimatedTile title="Courses" value={teacherInfo.coursesCount} />
          <AnimatedTile title="Enrolled Students" value={teacherInfo.totalEnrolled} />
          <AnimatedTile title="Videos" value={teacherInfo.videosCount} />
          <AnimatedTile title="Tests" value={teacherInfo.testsCount} />
        </div>
      )}
    </div>
  );
}

function AnimatedTile({ title, value }) {
  return (
    <motion.div
      className="border border-gray-300 rounded-md p-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-xl font-bold">{value}</p>
    </motion.div>
  );
}
