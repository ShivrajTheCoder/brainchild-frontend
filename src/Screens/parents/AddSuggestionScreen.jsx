import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddSuggestionScreen = () => {
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const parent = useSelector((state) => state.parent);
    const { userId, token, isLoggedIn, childId } = parent;
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        setError(null);
        event.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/parent/addsuggestion`, {
                description,
                author: userId
            });
            if (response.status === 201) {
                alert('Suggestion added successfully!');
                setDescription('');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen p-4 pt-6">
            <h2 className="text-2xl font-bold text-gray-800">Add Suggestion</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 w-full">
                    {/* <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label> */}
                    <textarea
                        id="description"
                        placeholder='Send Suggestion to admin'
                        value={description}
                        onChange={handleDescriptionChange}
                        className="bg-white appearance-none border-3 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white w-80 h-80"
                    />
                </div>
                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Suggestion
                </button>
            </form>
        </div>
    );
};

export default AddSuggestionScreen;