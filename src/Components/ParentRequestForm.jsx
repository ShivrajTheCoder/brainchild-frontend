import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ParentRequestForm() {
    const navigate=useNavigate();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    const user = useSelector((state) => state.user);
    const { userId } = user;
    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}/user/getallrequests/${userId}`);
                console.log(response.data.requests)
                setRequests(response.data.requests);
            } catch (err) {
                setError('Failed to fetch requests');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [apiUrl]);
    const handleAccept=async(reqId)=>{
        try {
            const resp=await axios.post(`${apiUrl}/user/acceptrequest/${reqId}`,{});
            if(resp.status===200){
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="p-4 min-h-screen">
            <h1 className="text-xl font-bold mb-4">Parent Requests</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Please request your parent to signup and send request.</p>}
            {!loading && !error && (
                <div>
                    {requests.length === 0 ? (
                        <p>Please request your parent to signup and send request.</p>
                    ) : (
                        <ul className="space-y-4">
                            {requests.map((request) => (
                                <li key={request._id} className="flex items-center space-x-4 p-4 border rounded shadow">
                                    <FaUserCircle size={40} className="text-gray-500" />
                                    <div>
                                        <p>{request.sender}</p>
                                    </div>
                                    <button onClick={()=>handleAccept(request._id)} className='bg-green-500 text-white py-2 px-3 rounded'>Accept</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
