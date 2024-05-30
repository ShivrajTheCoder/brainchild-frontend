import axios from 'axios';
import React, { useEffect, useState } from 'react';

const questions = [
  {
    id: 1,
    marks: 5,
    description: "What is the capital of France?",
    options: [
      { id: 1, choice: "Paris" },
      { id: 2, choice: "London" },
      { id: 3, choice: "Berlin" },
      { id: 4, choice: "Rome" }
    ]
  },
  {
    id: 2,
    marks: 3,
    description: "What is the chemical symbol for water?",
    options: [
      { id: 5, choice: "H2O" },
      { id: 6, choice: "CO2" },
      { id: 7, choice: "O2" },
      { id: 8, choice: "NaCl" }
    ]
  },
  {
    id: 3,
    marks: 4,
    description: "Who wrote 'Romeo and Juliet'?",
    options: [
      { id: 9, choice: "William Shakespeare" },
      { id: 10, choice: "Jane Austen" },
      { id: 11, choice: "Charles Dickens" },
      { id: 12, choice: "Leo Tolstoy" }
    ]
  },
  {
    id: 4,
    marks: 6,
    description: "What is the largest mammal?",
    options: [
      { id: 13, choice: "Elephant" },
      { id: 14, choice: "Blue Whale" },
      { id: 15, choice: "Giraffe" },
      { id: 16, choice: "Hippopotamus" }
    ]
  },
  {
    id: 5,
    marks: 2,
    description: "Which planet is known as the Red Planet?",
    options: [
      { id: 17, choice: "Mars" },
      { id: 18, choice: "Venus" },
      { id: 19, choice: "Jupiter" },
      { id: 20, choice: "Saturn" }
    ]
  }
];

const TaketestScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [questionId]: optionId
    }));
  };

  const [test,setTest]=useState();
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState();
  const apiUrl=import.meta.env.VITE_API_URL;
  useEffect(()=>{
    const fetchtest=async ()=>{
      try {
        const resp=await axios.get(`${apiUrl}/course/gettestbyid/6654f331cea7f9ad81ea2a56`)
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    }
    fetchtest();
  },[])
  return (
    <div className="mx-20 px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Take Test</h2>
      {questions.map(question => (
        <div key={question.id} className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold mb-4">{question.description}</h3>
          <ul>
            {question.options.map(option => (
              <li key={option.id} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-gray-600"
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={selectedOptions[question.id] === option.id}
                    onChange={() => handleOptionSelect(question.id, option.id)}
                  />
                  <span className="ml-2">{option.choice}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Submit Test</button>
    </div>
  );
};

export default TaketestScreen;
