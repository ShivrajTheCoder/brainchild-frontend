import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllSuggestionContainer() {
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getAllSuggestions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/admin/getallsuggestions`);
                console.log(response.data, "here are the suggestion");
                setSuggestions(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        getAllSuggestions();
    }, []);

    return (
        <div className='my-4'>
            {loading ? (
                <div className="text-center">
                    <h2>Loading...</h2>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">All Suggestions</h2>
                    {suggestions.length > 0 ? (
                        <section className='grid grid-cols-4 gap-5'>
                            {suggestions.map((suggestion, index) => (
                                <div key={index} className='bg-white rounded shadow p-2 flex flex-col'>
                                    <p>{suggestion.description}</p>
                                    <span className='mt-auto ml-auto text-green-500'>By-{suggestion.author? suggestion.author : "Shivraj"}</span>
                                </div>
                            ))}
                        </section>
                    ) : (
                        <p>No suggestions available.</p>
                    )}
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                </div>
            )}
        </div>
    );
}