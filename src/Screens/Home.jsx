import React, { useEffect, useState, useRef } from 'react';
import UserSidebar from '../Components/Layout/UserSidebar';
import { Outlet } from 'react-router-dom';

export default function Home() {
  const [totalTime, setTotalTime] = useState(0);
  const startTimeRef = useRef(new Date());
  const intervalId = useRef(null);

  useEffect(() => {
    const updateTotalTime = () => {
      const currentTime = new Date();
      setTotalTime((prevTotal) => prevTotal + (currentTime - startTimeRef.current));
      startTimeRef.current = currentTime;
    };

    intervalId.current = setInterval(updateTotalTime, 1000);

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
      updateTotalTime();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', updateTotalTime);
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
