import React, { useState } from 'react';
import Input from '../Input';
import Textarea from '../Textarea';

const AddQuestionForm = ({ onAddQuestion }) => {
    const [newQuestion, setNewQuestion] = useState({
        marks: 0,
        description: '',
        options: ['', '', '', ''], // Initialize with four empty strings
        correct: ''
    });

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newQuestion.options];
        updatedOptions[index] = value;
        setNewQuestion(prevQuestion => ({
            ...prevQuestion,
            options: updatedOptions
        }));
    };

    const handleAddQuestion = () => {
        // Check if any field is empty
        if (
            newQuestion.description.trim() === '' ||
            newQuestion.marks === 0 ||
            newQuestion.options.some(option => option.trim() === '') ||
            newQuestion.correct === ''
        ) {
            // Display an alert or error message to inform the user about the missing fields
            alert("Please fill in all fields before adding the question.");
            return; // Prevent adding the question if any field is missing
        }

        // If all fields are filled, add the question
        onAddQuestion(newQuestion);
        setNewQuestion({
            marks: 0,
            description: '',
            options: ['', '', '', ''], // Reset options to empty strings
            correct: ''
        });
    };

    const handleCorrectOptionChange = (event) => {
        setNewQuestion(prevQuestion => ({
            ...prevQuestion,
            correct: event.target.value
        }));
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Add Question</h2>
            <Textarea
                label="Description"
                name="description"
                placeholder="Enter question description"
                value={newQuestion.description}
                onChange={event => setNewQuestion(prevQuestion => ({
                    ...prevQuestion,
                    description: event.target.value
                }))}
            />
            <Input
                label="Marks"
                name="marks"
                type="number"
                placeholder="Marks"
                value={newQuestion.marks === 0 ? '' : newQuestion.marks}
                onChange={event => setNewQuestion(prevQuestion => ({
                    ...prevQuestion,
                    marks: event.target.value === '' ? 0 : parseInt(event.target.value)
                }))}
            />
            <div>
                <label className="text-gray-700 text-sm font-bold mb-2">Options:</label>
                <div className="grid grid-cols-2 gap-4">
                    {newQuestion.options.map((option, index) => (
                        <Input
                            key={index}
                            label={` ${String.fromCharCode(65 + index)}.`} // Labels as A, B, C, D
                            name={`option${index}`}
                            type="text"
                            placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                            value={option}
                            onChange={event => handleOptionChange(index, event.target.value)}
                        />
                    ))}
                </div>
            </div>
            <div>
                <label className="text-gray-700 text-sm font-bold mb-2">Correct Option:</label>
                <select
                    value={newQuestion.correct}
                    onChange={handleCorrectOptionChange}
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Select Correct Option</option>
                    {newQuestion.options.map((option, index) => (
                        <option key={index} value={String.fromCharCode(65 + index)}>
                            Option {String.fromCharCode(65 + index)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleAddQuestion}>+ Add Question</button>
            </div>
        </div>
    );
};

export default AddQuestionForm;
