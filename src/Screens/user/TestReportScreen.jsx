import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TestReportScreen() {
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
                console.log(response.data)
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
            <h1 className='my-4 font-bold text-xl'>Test Reports</h1>
            <div>
                {testReports.length === 0 ? (
                    <p>No test reports available.</p>
                ) : (
                    <ul>
                        {testReports.map((test, index) => (
                            <li key={index} className="mb-6 border-b border-gray-200 pb-6">
                                <h2 className="text-lg font-semibold mb-2">Test: {test.testId.testName || 'N/A'}</h2>
                                <p className="mb-2"><span className="font-semibold">Total Marks:</span> {test.totalMarks}</p>
                                <p className="mb-2"><span className="font-semibold">Scored:</span> {test.scored}</p>
                                <h3 className="font-semibold mb-2">Topic Results:</h3>
                                <ul>
                                    {test.topicResults.map((topicResult, topicIndex) => (
                                        <li key={topicIndex} className="mb-2">
                                            <p><span className="font-semibold">Topic:</span> {topicResult.topic_name}</p>
                                            <p><span className="font-semibold">Result:</span> {topicResult.result}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
