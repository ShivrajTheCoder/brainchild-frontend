import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaketestScreen = () => {
  const { testId } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});

  const [test, setTest] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const resp = await axios.get(`${apiUrl}/courses/gettestbyid/${testId}`);
        if (resp.status === 200) {
          setTest(resp.data.test);
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleOptionChange = (optionId, questionId) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = () => {
    console.log('Selected Options:', selectedOptions);
    // You can send the selected options to the backend API here
  };

  return (
    <div className="mx-20 px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Take Test</h2>
      {test.questions.map((question, index) => (
        <div key={question.id} className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold mb-4">{question.description}</h3>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={option.id} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-gray-600"
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={selectedOptions[question.id] === option.id}
                    onChange={() => handleOptionChange(option.id, question.id)}
                  />
                  <span className="ml-2">{option}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
        Submit Test
      </button>
    </div>
  );
};

export default TaketestScreen;