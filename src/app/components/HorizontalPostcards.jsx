'use client';
import { useState, useEffect } from 'react';
import PostCard from '@/app/components/PostCard';

export default function HorizontalPostcards() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Example fetch for posts - replace with your API call
    fetch(`/api/discussionforum/get`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b2c25] via-[#7a4f32] to-[#d18f50] text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Our Posts</h1>
      
      <div className="overflow-hidden relative">
        <div className="flex animate-marquee">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="flex-shrink-0 w-80 mx-4">
                <PostCard card={post} />
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
