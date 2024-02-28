import React, { useState } from 'react';
import Input from '../Input';
import Textarea from '../Textarea';


const AddQuestionForm = ({ onAddQuestion }) => {
    const [newQuestion, setNewQuestion] = useState({
        marks: 0,
        description: '',
        options: [],
        correct: { choice: '' }
    });

    const handleOptionChange = (index, event) => {
        const { value } = event.target;
        const updatedOptions = [...newQuestion.options];
        updatedOptions[index] = { choice: value };
        setNewQuestion(prevQuestion => ({
            ...prevQuestion,
            options: updatedOptions
        }));
    };

    const handleCorrectOptionChange = event => {
        const { value } = event.target;
        setNewQuestion(prevQuestion => ({
            ...prevQuestion,
            correct: { choice: value }
        }));
    };

    const handleAddQuestion = () => {
        const newQuestionCopy = {
            marks: newQuestion.marks,
            description: newQuestion.description,
            options: [...newQuestion.options],
            correct: { choice: newQuestion.correct.choice }
        };
        onAddQuestion(newQuestionCopy);
        setNewQuestion({
            marks: 0,
            description: '',
            options: [],
            correct: { choice: '' }
        });
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Add Question</h2>
            <div className='grid grid-cols-12 gap-3'>
                <div className=' col-span-11'>
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
                </div>
                <Input
                    label="Marks"
                    name="marks"
                    type="number"
                    placeholder={"marks"}
                    value={newQuestion.marks === 0 ? "" : newQuestion.marks}
                    onChange={event => setNewQuestion(prevQuestion => ({
                        ...prevQuestion,
                        marks: event.target.value === "" ? 0 : parseInt(event.target.value)
                    }))}
                />

            </div>

            <div >
                <label className="  text-gray-700 text-sm font-bold mb-2">Options:</label>
                <div className='grid grid-cols-4 gap-7'>
                    {newQuestion.options.map((option, index) => (
                        <Input
                            key={index}
                            name={`option${index}`}
                            type="text"
                            placeholder={`Enter option ${index + 1}`}
                            value={option.choice}
                            onChange={event => handleOptionChange(index, event)}
                        />
                    ))}
                </div>
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => setNewQuestion(prevQuestion => ({
                    ...prevQuestion,
                    options: [...prevQuestion.options, { choice: '' }]
                }))}>Add Option</button>
            </div>
            <div className='w-fit my-4'>
                <Input
                    label="Correct Option"
                    name="correctOption"
                    type="text"
                    placeholder="Enter correct option"
                    value={newQuestion.correct.choice}
                    onChange={handleCorrectOptionChange}
                />
            </div>
            <div>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 mr-4" onClick={handleAddQuestion}>Add Question</button>
            </div>
        </div>
    );
};

export default AddQuestionForm;
