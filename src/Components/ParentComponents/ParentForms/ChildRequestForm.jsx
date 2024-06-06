import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ChildRequestForm() {
    const [childemail, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const parent = useSelector((state) => state.parent)
    const { userId, token, isLoggedIn, childId, email } = parent;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(`${apiUrl}/parent/sendparentrequest`, { childEmail: childemail, parentEmail: email });
            if (response.status === 201) {
                alert("Request sent")
                setSuccess('Request sent successfully!');
            }
        } catch (err) {
            setError('Failed to send request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 min-h-32">
            <h1 className="text-xl font-bold mb-4">Send Request to Child</h1>
            <p className="mb-4 text-gray-700">
                If a request is already sent, please ask your child to accept it.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="childemail" className="block text-sm font-medium text-gray-700">
                        Child Email
                    </label>
                    <input
                        type="email"
                        id="childemail"
                        value={childemail}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Request'}
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </form>
        </div>
    );
}
