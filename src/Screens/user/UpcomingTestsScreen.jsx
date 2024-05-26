import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UpcomingTestsScreen() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const userId = "yourUserId"; // Replace with actual userId
        const response = await axios.get(`${apiUrl}/user/getuserupcomingtests/65df757175d959b627baeef2`);
        console.log(response.data);
        setTests(response.data.tests);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-red-500">No Upcoming Tests</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Tests</h1>
      {tests.map(test => (
        <div key={test._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <p className="font-semibold"><strong>Test Name:</strong> {test.name}</p>
          <p><strong>Maximum Marks:</strong> {test.maximumMarks}</p>
          <p><strong>Scored:</strong> {test.scored}</p>
          <button 
            // onClick={() => takeTest(test._id)} 
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Take Test
          </button>
        </div>
      ))}
    </div>
  );

  
}
