'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // For getting the post ID from the URL

const DetailedPostCardView = () => {
  const router = useRouter();
  const { postId } = router.query; // Extract post ID from the URL
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (postId) {
      // Fetch post data from API or use passed data
      const fetchPostData = async () => {
        const response = await fetch(`/api/posts/${postId}`);
        const data = await response.json();
        setCard(data);
      };

      fetchPostData();
    }
  }, [postId]);

  if (!card) return <p>Loading post details...</p>;

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border-amber-600/40">
      <div className="flex space-x-4">
        {/* Left: User details */}
        <div className="flex-shrink-0">
          <img
            src={`/api/images/${card.user.profilePhoto}`}
            alt="Avatar"
            className="h-16 w-16 rounded-full border border-amber-600/40"
          />
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-stone-50 text-lg font-semibold">{card.user.username}</span>
          <span className="text-xs text-gray-400">{card.timestamp}</span>
          <span className="text-sm text-stone-200">{card.location}</span>
        </div>
      </div>

      <div className="mt-6">
        {/* Center: Title and Content */}
        <h1 className="text-4xl font-bold text-stone-50">{card.title}</h1>
        <p className="mt-4 text-gray-300">{card.content}</p>
      </div>

      {/* Right: Post Images */}
      {card.imageUrl && (
        <div className="mt-6">
          <img
            className="w-full h-96 object-cover rounded-lg border border-amber-600/40"
            src={`/api/images/${card.imageUrl}`}
            alt="Post Image"
          />
        </div>
      )}
    </div>
  );
};

export default DetailedPostCardView;
