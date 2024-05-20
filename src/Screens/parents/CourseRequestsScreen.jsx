import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RazorpayButton from '../../Components/Payment/RazorpayButton';

export default function CourseRequestsScreen() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [order,setOrder]=useState(null);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const resp = await axios.get(`${apiUrl}/parent/courserequest/65df757175d959b627baeef2`);
        setRequests(resp.data.requests);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, [apiUrl]);


  const handlePlaceOrder=async(courseId)=>{
    try{
      const resp=await axios.post(`${apiUrl}/parent/createorder`,{
        course:courseId,
        user:"65df757175d959b627baeef2"
      });
      console.log(resp.data);
      if(resp.status===201){
        setOrder(resp.data.order);
      }
      else{
        console.log("Something went wrong!");
      }
    }
    catch(error){
      console.log("something went wrong!");
    }
  }

  if (loading) {
    return <div className='m-10'>Loading...</div>;
  }

  if (error) {
    return <div className='m-10'>No requests found!</div>;
  }

  return (
    <div className='m-10'>
      <h1 className='font-bold text-xl mb-4'>Requested Courses</h1>
      <div className='grid grid-cols-1 gap-4'>
        {requests.map((request) => (
          <div key={request._id} className='border p-4 rounded shadow grid grid-cols-10 gap-4'>
            <img src={request.courseId.thumbnail || "https://res.cloudinary.com/dushmacr8/image/upload/v1686558017/samples/landscapes/nature-mountains.jpg"} alt={request.courseId.name} className=' col-span-3 w-full' />
            <div className=' col-span-7 '>
              <h2 className='font-bold text-xl'>{request.courseId.name}</h2>
              <p className='text-gray-700'>{request.courseId.description}</p>
              <div className='grid grid-cols-3 text-lg font-semibold text-gray-400'>
                  <div>
                    Videos :{request.courseId.videos.length}
                  </div>
                  <div>
                    Enrolled :{request.courseId.enrolled}
                  </div>
              </div>
              {
                !order && <button className='mt-2 bg-yellow-400 text-black font-bold px-4 py-2 rounded' onClick={()=>handlePlaceOrder(request.courseId._id)} >
                Buy Now
              </button>
              }
              {
                order?.course===request.courseId._id && <RazorpayButton order={order}/>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
