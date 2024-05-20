// ChildReportScreen.js
import React from 'react';
import BarChart from '../../Components/BarChart';


const ChildReportScreen = () => {
  // Example data representing hours online for each day of the month
  const data = [2, 3, 1, 4, 5, 3, 2, 5, 6, 4, 3, 5, 7, 8, 6, 7, 3, 5, 6, 7, 4, 5, 6, 7, 8, 9, 5, 6, 4, 5];

  return (
    <div className='m-10'>
      <h1 className='my-4 font-bold text-xl'>Child Report</h1>
      <BarChart data={data} />
    </div>
  );
};

export default ChildReportScreen;
