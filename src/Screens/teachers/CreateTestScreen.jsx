// CreateTestScreen.js
import React, { useEffect, useState } from 'react';
import AddQuestionForm from '../../Components/TeacherComponents/AddQuestionForm';
import axios from 'axios';

export default function CreateTestScreen() {
    const [step, setStep] = useState(1);
    const [course, setCourse] = useState('');
    const [questions, setQuestions] = useState([]);
    const [testName, setTestName] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState({
        description: '',
        marks: '',
        options: ['', '', '', ''],
        correct: '',
        topic: ''
    });
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [duration, setDuration] = useState(15);
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
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const durationOptions = Array.from({ length: 4 }, (_, i) => (i + 1) * 15); // Generate duration options: [15, 30, 45, 60]

    const validateForm = () => {
        if (!testName || !course || !startDate || !startTime || !endTime) {
            setValidationError('All fields are mandatory.');
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

        if (topics.length === 0) {
            setValidationError('Please add at least one topic.');
            return false;
        }

        setValidationError('');
        return true;
    };

    const handleAddTopic = () => {
        if (newTopic && topics.length < 5 && !topics.includes(newTopic)) {
            setTopics([...topics, newTopic]);
            setNewTopic('');
        }
    };

    const handleAddQuestion = (newQuestion) => {
        if (isNaN(newQuestion.marks)) {
            setValidationError('Marks must be a number.');
            return;
        }
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
        setCurrentQuestion({
            description: '',
            marks: '',
            options: ['', '', '', ''],
            correct: '',
            topic: ''
        });
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        // if (questions.length < 5) {
        //     setValidationError('There must be at least 5 questions.');
        //     return;
        // }
        console.log(questions);
        try {
            const response = await axios.post(`${apiUrl}/courses/addtest`, {
                testName,
                questions,
                courseId: course,
                startDate,
                startTime,
                endTime,
                duration,
                topics
            });
            console.log(response.data, 'Test created successfully');
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
            {validationError && <p className="text-red-500">{validationError}</p>}

            {step === 1 && (
                <div>
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Topics (Max 5)</label>
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Add a topic"
                                value={newTopic}
                                onChange={e => setNewTopic(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <button
                                type="button"
                                onClick={handleAddTopic}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-2"
                            >
                                Add
                            </button>
                        </div>
                        <div className="mt-2">
                            {topics.map((topic, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full inline-block mr-2 mt-2"
                                >
                                    {topic}
                                </span>
                            ))}
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
                    <div>
                        <button
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={() => {
                                if (validateForm()) {
                                    setStep(2);
                                }
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <div className="mb-4">
                        {questions.map((question, index) => (
                            <div key={index} className="border border-gray-300 rounded p-4 mb-4">
                                <div className='grid grid-cols-10'>
                                    <h3 className="text-lg font-bold mb-2 col-span-1">Q {index + 1}.</h3>
                                    <p className='col-span-8 font-semibold text-lg'> {question.description}</p>
                                    <p><strong>Marks:</strong> {question.marks}</p>
                                    <p><strong>Topic:</strong> {question.topic}</p> {/* Display topic */}
                                </div>
                                <div className='grid grid-cols-4 my-5'>
                                    {question.options.map((option, i) => (
                                        <div key={i} className='bg-gray-200 w-fit px-3 py-1 rounded-md'>{question.options[i]}</div>
                                    ))}
                                </div>
                                <p className='my-5'><strong>Correct Option:</strong> <span className='bg-red-400 w-fit px-3 py-1 rounded-md'> {question.correct} </span></p>
                            </div>
                        ))}
                    </div>

                    <AddQuestionForm
                        onAddQuestion={handleAddQuestion}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        handleOptionChange={handleOptionChange}
                        topics={topics} // Pass topics to AddQuestionForm
                    />

                    {/* Submit Button */}
                    <div>
                        <button
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={handleSubmit}
                        >
                            Submit Test
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
