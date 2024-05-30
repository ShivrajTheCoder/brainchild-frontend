// AddQuestionForm.js
import React from 'react';

export default function AddQuestionForm({ onAddQuestion, currentQuestion, setCurrentQuestion, handleOptionChange, topics }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentQuestion(prevQuestion => ({
            ...prevQuestion,
            [name]: value
        }));
    };

    return (
        <div className="mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Question Description</label>
                <input
                placeholder='Enter question'
                    type="text"
                    name="description"
                    value={currentQuestion.description}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className=' grid grid-cols-2 gap-5'>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Marks</label>
                    <input
                        type="number"
                        name="marks"
                        value={currentQuestion.marks}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder='Enter marks'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Topic</label>
                    <select
                        name="topic"
                        value={currentQuestion.topic}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Topic</option>
                        {topics.map((topic, index) => (
                            <option key={index} value={topic}>{topic}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Options</label>
                <div className=' grid grid-cols-2 gap-4'>
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                            <input
                                type="text"
                                value={option}
                                onChange={e => handleOptionChange(index, e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder={`Enter option ` + String.fromCharCode(65 + index)}
                            />
                        </div>
                    ))}
                </div>

            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Correct Option</label>
                <select
                    name="correct"
                    value={currentQuestion.correct}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    {currentQuestion.options.map((option, index) => (
                        <option key={index} value={String.fromCharCode(65 + index)}>{String.fromCharCode(65 + index)}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={() => onAddQuestion(currentQuestion)}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
                Add Question
            </button>
        </div>
    );
}
