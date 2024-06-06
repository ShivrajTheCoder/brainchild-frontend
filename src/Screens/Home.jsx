import React, { useEffect, useState, useRef } from 'react';
import UserSidebar from '../Components/Layout/UserSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed and imported
import { useSelector } from 'react-redux';
import ParentRequestForm from '../Components/ParentRequestForm';

export default function Home() {
  const [totalTime, setTotalTime] = useState(0);
  const startTimeRef = useRef(new Date());
  const intervalId = useRef(null);
  const apiIntervalId = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userId, isLoggedIn, parentId } = user;
  // console.log(user,"here is the user");
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

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
        await axios.post(`${apiUrl}/user/addtime`, {
          userId,
          date: new Date().toISOString().split('T')[0],
          time: 300
        });
      } catch (error) {
        console.error('Failed to update user time', error);
      }
    };

    apiIntervalId.current = setInterval(sendTimeToServer, 10000); // 10000 ms = 10 seconds

    return () => {
      clearInterval(apiIntervalId.current);
    };
  }, [apiUrl, userId]);

  return (
    <div className='flex'>
      {parentId &&
        <>
          <UserSidebar totalTime={totalTime} />
          <div className="flex-1 overflow-y-scroll h-screen">
            <Outlet />
          </div>
        </>
      }
      {
        !parentId && <ParentRequestForm />
      }
    </div>
  );
}
