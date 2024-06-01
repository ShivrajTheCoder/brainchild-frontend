import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionCard from '../../Components/Exam/QuestionCard';

const TaketestScreen = () => {
  const { testId } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [testResponse, setResponse] = useState([]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const resp = await axios.get(`${apiUrl}/courses/gettestbyid/${testId}`);
        if (resp.status === 200) {
          setTest(resp.data.test);

          // Initialize testResponse array with objects for each question
          const initialResponse = resp.data.test.questions.map(question => ({
            questionId: question._id,
            optionIndex: -1
          }));
          setResponse(initialResponse);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [apiUrl, testId]);


  const handleSubmit = async () => {
    console.log(testResponse);
    // Here you can submit the testResponse to the server
    try {
      const resp=await axios.post(`${apiUrl}/user/submitresponse`,{
        testResponse, userId:"65df757175d959b627baeef2", testId
      })
      if(resp.status===201){
        console.log(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const markQuestion = (questionId, optionIndex) => {
    // Copy the current testResponse array
    const updatedResponse = [...testResponse];

    // Find the index of the question in the response array
    const questionIndex = updatedResponse.findIndex(response => response.questionId === questionId);

    // If the question is already marked, update its option index
    if (questionIndex !== -1) {
      updatedResponse[questionIndex].optionIndex = optionIndex;
    } else {
      // If the question is not marked yet, add it to the response array
      updatedResponse.push({ questionId, optionIndex });
    }

    // Update the state with the new response array
    setResponse(updatedResponse);
  };



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-20 px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Take Test</h2>
      {test?.questions?.map((question, i) => (
        <QuestionCard
          question={question}
          key={question._id}
          qno={i}
          markQuestion={markQuestion}
        />
      ))}
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
        Submit Test
      </button>
    </div>
  );
};

export default TaketestScreen;
