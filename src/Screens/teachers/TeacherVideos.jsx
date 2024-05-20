import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TeacherVideos() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const authorId = '6578af9de664acfdcff9e0b4';
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApproved, setShowApproved] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}/teacher/getallteachervideos/${authorId}`);
        if (response.status === 200) {
          setVideos(response.data.videos);
        }
      } catch (error) {
        console.log(error);
        setError('Failed to fetch videos');
        toast.error('Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [apiUrl, authorId]);

  const handleToggleApproved = () => {
    setShowApproved(!showApproved);
  };

  const filteredVideos = showApproved ? videos.filter(video => video.approved) : videos.filter(video => !video.approved);

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Teacher Videos</h1>
      <div className="mb-4">
        <label className="mr-2">Show Approved Videos:</label>
        <input type="checkbox" checked={showApproved} onChange={handleToggleApproved} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">Title</th>
              <th className="py-2 px-4 border border-gray-300">Description</th>
              <th className="py-2 px-4 border border-gray-300">Course</th>
              <th className="py-2 px-4 border border-gray-300">Thumbnail</th>
              <th className="py-2 px-4 border border-gray-300">Approved</th>
              <th className="py-2 px-4 border border-gray-300">Likes</th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos.map((video) => (
              <tr key={video._id}>
                <td className="py-2 px-4 border border-gray-300">{video.title}</td>
                <td className="py-2 px-4 border border-gray-300">{video.description}</td>
                <td className="py-2 px-4 border border-gray-300">{video.course}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <img src={video.thumbnail} alt={video.title} className="h-10 w-10 object-cover" />
                </td>
                <td className="py-2 px-4 border border-gray-300">{video.approved ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border border-gray-300">{video.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
