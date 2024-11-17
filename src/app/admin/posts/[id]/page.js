'use client';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { use } from 'react';
import PostCard from '@/app/components/PostCard';

export default function PostReviewPage({ params }) {
  const { id } = use(params); // Use React.use() to unwrap the params
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [isApproving, setIsApproving] = useState(false);


  // Fetch post details and sentiment metrics
  useEffect(() => {
    if (id) {
      fetch(`/api/discussionforum/get?postId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setMetrics(data.sentimentMetrics);  // Assuming sentimentMetrics are part of the post object
        })
        .catch((error) => console.error("Error fetching post:", error));
    }
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const handleDelete = async (postId) => {
    try {
      setDeletingPostId(postId); // Set the post being deleted
      const response = await fetch(`/api/discussionforum/delete?postId=${postId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        router.push('/admin'); 
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    } finally {
      setDeletingPostId(null); // Reset the deleting state after the operation
    }
  };
  const handleApprove = async (postId) => {
    try {
      setIsApproving(true); // Set loading state
  
      const response = await fetch(`/api/discussionforum/approvepost?postId=${postId}`, {
        method: 'POST',
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message); // Success message
        router.push('/admin'); 
      } else {
        alert(result.message); // Error message
      }
    } catch (error) {
      console.error('Error approving post:', error);
      alert('Error approving post');
    } finally {
      setIsApproving(false); // Reset loading state
    }
  };
  

  // Calculate the final verdict based on the metrics
  const calculateVerdict = () => {
    if (!metrics) return null;
    let positives = 0;
    let Negatives = 0;
    Object.values(metrics).forEach((status) => {
      if (status === 'Positive') positives++;
      if (status === 'Negative') Negatives++;
    });

    return positives > Negatives ? 'Post Approved' : 'Post Needs Review';
  };

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <Image
        src="/bg1.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

    <div className="absolute inset-0 bg-black bg-opacity-50 z-10 min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mt-10 mb-6 text-center">Review Post</h1>

      <div className="flex justify-center space-x-8">
        {/* Post content */}
        <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg ">
          <PostCard card={post} />
        </div>

        {/* Sentiment metrics table on the right side */}
        <div className="bg-black bg-opacity-30 p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-400">Sentiment Analysis Metrics</h2>

          {/* Displaying sentiment metrics dynamically */}
          <table className="w-full text-left text-white">
            <thead>
              <tr>
                <th className="p-2 border-b border-orange-400">Metric</th>
                <th className="p-2 border-b border-orange-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics ? Object.entries(metrics).map(([metric, status], index) => (
                <tr key={index}>
                  <td className="p-2 border-b border-orange-600">{metric}</td>
                  <td className={`p-2 border-b border-orange-600 ${status === 'Positive' ? 'text-green-500' : 'text-red-500'}`}>
                    {status}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td className="p-2" colSpan="2">Loading metrics...</td>
                </tr>
              )}
              {/* Final Verdict Row */}
              <tr>
                <td className="p-2 font-bold border-t border-orange-600" colSpan="2">
                  <div className="text-center mt-4 text-xl">
                    <span className={`font-bold ${calculateVerdict() === 'Post Approved' ? 'text-green-500' : 'text-red-500'}`}>
                      Final Verdict: {calculateVerdict()}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Action buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            {/* <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition">Approve Post</button> */}
            <button
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition"
              onClick={() => handleApprove(id)}
              disabled={isApproving} // Disable button while approving
            >
              {isApproving ? 'Approving...' : 'Approve Post'}
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => handleDelete(id)}
              disabled={deletingPostId === id} // Disable the button for the post being deleted
            >
              {deletingPostId === id ? 'Deleting...' : 'Delete'}
            </button>
            {/* <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition">Delete Post</button> */}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
