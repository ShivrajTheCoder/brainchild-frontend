import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaQuestion } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaClock } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function UpcomingTestsScreen() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigation = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const userId = "yourUserId"; // Replace with actual userId
        const response = await axios.get(`${apiUrl}/user/getuserupcomingtests/65df757175d959b627baeef2`);
        console.log(response.data.tests);
        const formattedTests = response.data.tests.map(test => ({
          ...test,
          startDate: formatDate(test.startDate) // Format the date
        }));
        setTests(formattedTests);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-red-500">No Upcoming Tests</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Tests</h1>
      {tests.map(test => (
        <div key={test._id} className="bg-white shadow-md rounded-lg p-4 mb-4 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <div className='flex'>
            <h3 className=' mb-4 font-bold text-2xl underline'>{test.testName}</h3>
            <p className='ml-auto'>Maximum Marks: <span className='text-red-500'>{test.maximumMarks}</span> </p>
          </div>
          <div className='grid grid-cols-4'>
            <div className=' flex items-center'>
              <span className=' text-3xl font-extrabold'>Qs.</span>
              <strong className=' text-3xl' >{test.questions.length}</strong>
            </div>
            <div className=' flex items-center'>
              <SlCalender className='mx-2' size={20} />
              <strong className=' text-lg' >{test.startDate}</strong>
            </div>
            <div className=' flex items-center'>
              <FaClock className='mx-2' size={20} />
              <strong className=' text-3xl' >{test.duration} <span className='text-lg'>min</span></strong>
            </div>
            <div className=' flex items-center'>
              <FaBook className='mx-2' size={20} />
              <strong className=' text-3xl' >{test.topics.length} <span className='text-lg'>topics</span></strong>
            </div>
          </div>
          <div className='w-full flex'>
            <button onClick={() => navigation(`/take-test/${test._id}`)} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 ml-auto flex items-center">
              Take Test
              <FaArrowRight className="ml-2" />
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
