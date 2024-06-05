import React, { useEffect, useState, useRef } from 'react';
import UserSidebar from '../Components/Layout/UserSidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed and imported

export default function Home() {
  const [totalTime, setTotalTime] = useState(0);
  const startTimeRef = useRef(new Date());
  const intervalId = useRef(null);
  const apiIntervalId = useRef(null);
  const apiUrl=import.meta.env.VITE_API_URL;
  const userId="65df757175d959b627baeef2";
  useEffect(() => {
    const updateTotalTime = () => {
      const currentTime = new Date();
      setTotalTime((prevTotal) => prevTotal + (currentTime - startTimeRef.current));
      startTimeRef.current = currentTime;
    };

    intervalId.current = setInterval(updateTotalTime, 300000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalId.current);
        updateTotalTime();
      } else {
        startTimeRef.current = new Date();
        intervalId.current = setInterval(updateTotalTime, 1000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', updateTotalTime);

    return () => {
      clearInterval(intervalId.current);
      clearInterval(apiIntervalId.current);
      updateTotalTime();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', updateTotalTime);
    };
  }, []);

  useEffect(() => {
    const sendTimeToServer = async () => {
      try {
        const resp=await axios.post(`${apiUrl}/user/addtime`, {
          userId,
          date: new Date().toISOString().split('T')[0], 
          time: 300
        });
        // console.log(resp.data);
      } catch (error) {
        console.error('Failed to update user time', error);
      }
    };

    apiIntervalId.current = setInterval(sendTimeToServer, 10000); // 300000 ms = 5 minutes

    return () => {
      clearInterval(apiIntervalId.current);
    };
  }, []);

  return (
    <div className='flex'>
      <UserSidebar totalTime={totalTime} />
      <div className="flex-1 overflow-y-scroll h-screen">
        <Outlet />
      </div>
    </div>
  );
}
