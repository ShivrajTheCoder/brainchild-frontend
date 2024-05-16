import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddQuestionForm from '../../Components/TeacherComponents/AddQuestionForm';
import Input from '../../Components/Input';
import axios from 'axios';

export default function CreateTestScreen() {
    const [course, setCourse] = useState('');
    const [questions, setQuestions] = useState([]);
    const [testName, setTestName] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState({
        description: '',
        marks: '',
        options: ['', '', '', ''], // Initialize with four empty strings
        correct: ''
    });
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [duration, setDuration] = useState(15);
    const [instructions, setInstructions] = useState('');
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const authorId = '6578af9de664acfdcff9e0b4';
    const [validationError, setValidationError] = useState('');

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
            }
            finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    const durationOptions = Array.from({ length: 4 }, (_, i) => (i + 1) * 15); // Generate duration options: [15, 30, 45, 60]

    const validateForm = () => {
        if (!testName || !course || !startDate || !startTime || !endTime || questions.length < 5) {
            setValidationError('All fields are mandatory, and there must be at least 5 questions.');
            return false;
        }

        if (startTime >= endTime) {
            setValidationError('Start time must be before end time.');
            return false;
        }

        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${startDate}T${endTime}`);

        if (startDateTime.getTime() < Date.now() || endDateTime.getTime() < Date.now()) {
            setValidationError('Date and time must be in the future.');
            return false;
        }

        if (endDateTime.getTime() - startDateTime.getTime() < 3600000) {
            setValidationError('Time window must be at least 1 hour.');
            return false;
        }

        setValidationError('');
        return true;
    };

    const handleAddQuestion = (newQuestion) => {
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
        setCurrentQuestion({
            description: '',
            marks: '',
            options: ['', '', '', ''],
            correct: ''
        });
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

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

    const handleOptionChange = (index, value) => {
        setCurrentQuestion(prevQuestion => ({
            ...prevQuestion,
            options: prevQuestion.options.map((option, i) => (i === index ? value : option))
        }));
    };

    return (
        <div className="mx-20 px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Create Test</h1>
            <div className='p-10 bg-red-500 text-white font-semibold  text-lg rounded-md my-4'>
                <ul>
                    <li>- All questions are mcq based</li>
                    <li>- All questions have 4 options out of which only one can be correct</li>
                    <li>- There must be at least 5 questions in the test</li>
                </ul>
            </div>
            {validationError && <p className="text-red-500">{validationError}</p>}
            <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Test Name</label>
                    <input
                        name="testName"
                        type="text"
                        placeholder="Enter test name"
                        value={testName}
                        onChange={e => setTestName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Course</label>
                    {loading ? (
                        <p>Loading courses...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <select
                            name="course"
                            value={course}
                            onChange={e => setCourse(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select Course</option>
                            {courses.map(course => (
                                <option key={course._id} value={course._id}>{course.name}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>
            <div className="mb-4 grid grid-cols-4 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                    <input
                        name="startDate"
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
                    <input
                        name="startTime"
                        type="time"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">End Time</label>
                    <input
                        name="endTime"
                        type="time"
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Test Duration (minutes)</label>
                    <select
                        name="duration"
                        value={duration}
                        onChange={e => setDuration(parseInt(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {durationOptions.map(option => (
                            <option key={option} value={option}>{option} minutes</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-8">
                {questions.map((question, index) => (
                    <div key={index} className="border border-gray-300 rounded p-4 mb-4">
                        <div className=' grid grid-cols-10'>
                            <h3 className="text-lg font-bold mb-2 col-span-1">Q {index + 1}.</h3>
                            <p className=' col-span-8 font-semibold text-lg'> {question.description}</p>
                            <p><strong>Marks:</strong> {question.marks}</p>
                        </div>
                        <div className=' grid grid-cols-4 my-5'>
                            {question.options.map((option, i) => (
                                <div key={i} className=' bg-gray-200 w-fit px-3 py-1 rounded-md'>{question.options[i]}</div>
                            ))}
                        </div>
                        <p className='my-5'><strong>Correct Option:</strong> <span className=' bg-red-400 w-fit px-3 py-1 rounded-md'> {question.correct} </span></p>
                    </div>
                ))}
            </div>

            <AddQuestionForm
                onAddQuestion={handleAddQuestion}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                handleOptionChange={handleOptionChange}
            />

            {/* Submit Button */}
            <div>
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSubmit}>Submit Test</button>
            </div>
        </div>
    );
}
