import React from 'react';
import { Link } from 'react-router-dom';

const TestCard = ({ test }) => {
  const formatDate = (date) => {
    // Convert date object to string in a desired format
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/take-test`} className="flex justify-between bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition duration-300">
      <div>
        <h3 className="font-bold text-xl">{test.topic}</h3>
        <p className="text-gray-500">Date: {formatDate(test.date)}</p>
      </div>
      <div>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Take Test</button>
      </div>
    </Link>
  );
};

export default function ComingTestContainer() {
  // Dummy data for tests
  const tests = [
    { _id: 1, topic: "Test 1", date: new Date("2024-03-01") },
    { _id: 2, topic: "Test 2", date: new Date("2024-03-03") },
    { _id: 3, topic: "Test 3", date: new Date("2024-03-05") }
    // Add more tests as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Upcoming Tests</h2>
      {tests.map(test => (
        <TestCard key={test._id} test={test} />
      ))}
    </div>
  );
}
