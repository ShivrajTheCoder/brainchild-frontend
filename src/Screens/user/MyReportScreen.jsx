import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from '../../Components/BarChart';
import { useSelector } from 'react-redux';
// const data = [2, 3, 1, 4, 5, 3, 2, 5, 6, 4, 3, 5, 7, 8, 6, 7, 3, 5, 6, 7, 4, 5, 6, 7, 8, 9, 5, 6, 4, 5];
const MyReportScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user=useSelector((state)=>state.user);
    const {userId}=user;
  // const userId="65df757175d959b627baeef2"
  const apiUrl=import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchUserTime = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/getusertime/${userId}`);
        if(response.status===200){
          // console.log(response.data);
          const {timeline}=response.data;
          const fetchedData = timeline.map(entry => entry.timeInMinutes);
          setData(fetchedData);
        }
      
      } catch (err) {
        setError(err.message);
      }
      finally{
        setLoading(false);
      }
    };

    fetchUserTime();
  }, []);

  if (loading) {
    return <div className='m-10'>Loading...</div>;
  }

  if (error) {
    return <div className='m-10'>Error: {error}</div>;
  }

  return (
    <div className='m-10'>
      <h1 className='my-4 font-bold text-xl'>My Online Report</h1>
      <BarChart data={data} />
    </div>
  );
};

export default MyReportScreen;
