'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
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
    // <section className="relative w-full h-screen overflow-hidden">
    //   <Image
    //     src="/bg1.jpg"
    //     alt="Background Image"
    //     layout="fill"
    //     objectFit="cover"
    //     className="z-0 filter brightness-0"
    //   />

      // <div className="absolute inset-0 bg-black bg-opacity-50 z-10 ftext-white p-8">
      //   <h1 className="text-3xl font-bold mb-6 text-white text-center">Explore Our Posts</h1>
        
      //   <div className="overflow-hidden relative">
          <div className="postcard-container">
            <div className="animate-marquee">
              {posts.length > 0 ? (
                <>
                  {/* First set of posts */}
                  <div className="postcard-wrap">
                    {posts.map((post, index) => (
                      <div key={index} className="postcard mx-4">
                        <PostCard card={post} />
                      </div>
                    ))}
                  </div>

                  {/* Second set of posts for continuous scroll */}
                  <div className="postcard-wrap">
                    {posts.map((post, index) => (
                      <div key={index} className="postcard mx-4">
                        <PostCard card={post} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
      //   </div>

      // </div>
    // </section>
  );
}
