import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddQuestionForm from '../../Components/TeacherComponents/AddQuestionForm';
import Input from '../../Components/Input';



export default function CreateTestScreen() {
    const { courseId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [testName, setName] = useState("");
    const handleAddQuestion = newQuestion => {
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    };

    const handleSubmit = async () => {
        try {
            console.log('Test created successfully', questions);
            // Call your create test API here to save the questions
            // const response = await fetch('your-api-endpoint', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         courseId: courseId,
            //         questions: questions
            //     })
            // });
            // // Handle response as needed
        } catch (error) {
            console.error('Error creating test:', error);
        }
    };

    return (
        <div className=" mx-20 px-4 py-8">
            <div className='mb-4'>
                <h1 className="text-3xl font-bold ">Create Test</h1>
                <h3 className='text-xl font-semibold text-gray-400'>Course Name</h3>
            </div>
            <div>
                <div className="mb-4 w-fit">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Test Name</label>
                    <input
                        name="testName"
                        type="text"
                        placeholder="Enter test name"
                        value={testName}
                        onChange={e => {
                            setName(e.target.value);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>
            {/* Render previously added questions */}
            <div className="mb-8">
                {/* <h2 className="text-xl font-bold mb-4">Previously Added Questions</h2> */}
                {questions.map((question, index) => (
                    <div key={index} className="border border-gray-300 rounded p-4 mb-4">
                        <div className=' grid grid-cols-10'>
                            <h3 className="text-lg font-bold mb-2 col-span-1">Q {index + 1}.</h3>
                            <p className=' col-span-8 font-semibold text-lg'> {question.description}</p>
                            <p><strong>Marks:</strong> {question.marks}</p>
                        </div>
                        <div className=' grid grid-cols-4 my-5'>
                            {question.options.map((option, i) => (
                                <div key={i} className=' bg-gray-200 w-fit px-3 py-1 rounded-md'>{i + 1}. {option.choice}</div>
                            ))}
                        </div>
                        <p className='my-5'><strong>Correct Option:</strong> <span className=' bg-red-400 w-fit px-3 py-1 rounded-md'> {question.correct.choice} </span></p>
                    </div>
                ))}
            </div>

            {/* Add Question Form */}
            <AddQuestionForm onAddQuestion={handleAddQuestion} />

            {/* Submit Button */}
            <div>
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSubmit}>Submit Test</button>
            </div>
        </div>
    );
}
