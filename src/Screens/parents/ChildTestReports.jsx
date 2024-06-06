import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChildTestReports() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [testReports, setTestReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = "65df757175d959b627baeef2"; // Assuming you have a valid user ID

    useEffect(() => {
        setError(null);
        const fetchTestReports = async () => {
            try {
                const response = await axios.get(`${apiUrl}/user/gettestreport/${userId}`);
                setTestReports(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTestReports();
    }, [apiUrl, userId]);

    if (loading) {
        return <div className="m-10">Loading...</div>;
    }

    if (error) {
        return <div className="m-10">Error: {error}</div>;
    }

    return (
        <div className='m-10'> 
            <h1 className='my-4 font-bold text-2xl '>Test Reports</h1>
            <div>
                {testReports.map((test, index) => (
                    <div key={index} className="mb-6 border-b bg-white p-4 rounded shadow">
                        <div className='flex '>
                            <h2 className="text-2xl underline font-bold mb-2">{test.testId.testName || 'N/A'}</h2>
                            <div className='ml-auto flex'>
                                <span>Score:</span>
                                <p>{test.scored}/{test.totalMarks}</p>
                            </div>
                        </div>
                        <section>
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Strengths:</h3>
                                <div className="flex flex-wrap">
                                    {test.topicResults
                                        .filter(topicResult => topicResult.result === 'strength')
                                        .map((strength, strengthIndex) => (
                                            <div key={strengthIndex} className="bg-green-500 text-white rounded-md p-2 mr-2 mb-2">
                                                {strength.topic_name}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Weaknesses:</h3>
                                <div className="flex flex-wrap">
                                    {test.topicResults
                                        .filter(topicResult => topicResult.result === 'weakness')
                                        .map((weakness, weaknessIndex) => (
                                            <div key={weaknessIndex} className="bg-red-500 text-white rounded-md p-2 mr-2 mb-2">
                                                {weakness.topic_name}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </section>
                    </div>
                ))}
            </div>
        </div>
    );
}
