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

  // Calculate the final verdict based on the metrics
  const calculateVerdict = () => {
    if (!metrics) return null;
    let positives = 0;
    let negatives = 0;
    Object.values(metrics).forEach((status) => {
      if (status === 'positive') positives++;
      if (status === 'negative') negatives++;
    });

    return positives > negatives ? 'Post Approved' : 'Post Needs Review';
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
                  <td className={`p-2 border-b border-orange-600 ${status === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
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
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition">Approve Post</button>
            <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition">Warn User</button>
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition">Delete Post</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
