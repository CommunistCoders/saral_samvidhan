'use client';
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import { motion } from "framer-motion";

const PostCard = ({ card, index }) => {
  const { data: session } = useSession(); // Get the current session
  const [isLiked, setIsLiked] = useState(false); // Track like button state
  const [isDisliked, setIsDisliked] = useState(false); // Track dislike button state

  const handleLikeClick = async () => {
    // Check if the user is logged in
    if (!session) {
      alert("You must be logged in to like a post.");
      return;
    }
  
    const userId = session.user.id;
    const postId = card.id; // Assuming `card.id` is the post ID
  
    try {
      const response = await fetch('/api/discussionforum/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId }),
      });
  
      if (response.ok) {
        setIsLiked(!isLiked);
        if (isDisliked) setIsDisliked(false); // Ensure dislike is cleared if like is toggled on
      } else {
        // If the response is not ok, log the error message from the server
        const errorData = await response.json();
        console.error("Failed to like the post:", errorData.message || "Unknown error");
        alert(`Failed to like the post: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      // Log any unexpected errors (e.g., network issues)
      console.error("Error liking post:", error);
      alert("An error occurred while trying to like the post. Please try again later.");
    }
  };
  
  
  const handleDislikeClick = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false); // Ensure like is cleared if dislike is toggled on
  };

  const currentTimestamp = Date.now(); 
  const date = new Date(currentTimestamp);

  return (
    <motion.div
      key={card.id}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full max-w-lg mb-4"
    >
      <div className="bg-zinc-950 bg-opacity-75 backdrop-blur-3xl border rounded-xl border-amber-600/40">
        <div className="flex items-center px-4 py-3">
          <img
            className="h-10 w-10 rounded-full border border-amber-600/40"
            src={`/api/images/${card.user.profilePhoto}`}
            alt="Avatar"
          />
          <div className="ml-3">
            <span className="text-stone-50 text-sm font-semibold antialiased leading-tight flex flex-row">
              {card.user.username}
              <p className="text-xs ml-2 font-light">{card.timestamp}</p>
            </span>
            <span className="text-stone-50 text-xs block">{card.location}</span>
          </div>
        </div>
        <div className="px-4 py-3">

            <h1 className="text-2xl font-bold text-white shadow-md">
              {card.title}
            </h1>
            <p className="text-gray-300">{card.content}</p>
        </div>
        {/* Image Section - Conditionally Rendered if imageUrl is provided */}
        {card.imageUrl && (
          <div className="px-4 py-3">
            <img 
              className="w-full h-64 object-cover rounded-lg border border-amber-600/40"
              src={`/api/images/${card.imageUrl}`} 
              alt="Post Image" 
            />
          </div>
        )}
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex items-center space-x-6">
          {/* Like/Dislike Section */}
          <div className="flex items-center justify-between mx-4 mb-2">
            <div className="flex items-center space-x-1">
              {/* Like Button */}
              <button
                onClick={handleLikeClick}
                className={`flex items-center space-x-1 p-2 rounded-full transition-all duration-200 ease-in-out ${
                  isLiked ? 'bg-green-700/20' : 'hover:bg-green-700/20'
                }`}
              >
                <LuArrowBigUp
                  className={`h-8 w-8 ${
                    isLiked ? 'text-green-500 fill-current' : 'text-green-600'
                  }`}
                />
                <span className="text-md text-green-500 font-semibold">20</span>
              </button>

              {/* Dislike Button */}
              <button
                onClick={handleDislikeClick}
                className={`flex items-center space-x-1 p-2 rounded-full transition-all duration-200 ease-in-out ${
                  isDisliked ? 'bg-red-700/20' : 'hover:bg-red-700/20'
                }`}
              >
                <LuArrowBigDown
                  className={`h-8 w-8 ${
                    isDisliked ? 'text-red-500 fill-current' : 'text-red-600'
                  }`}
                />
                <span className="text-md text-red-500 font-semibold">20</span>
              </button>
            </div>
          </div>

            {/* Comment Button */}
            <button className="flex items-center space-x-1 p-2 rounded-full text-amber-600 hover:bg-amber-700/20 transition-all duration-200 ease-in-out">
              <FaRegComment className="h-8 w-8" />
              <span className="text-sm font-semibold">20</span>
            </button>

            {/* Share Button */}
            <button className="flex items-center space-x-1 p-2 rounded-full text-amber-600 hover:bg-amber-700/20 transition-all duration-200 ease-in-out">
              <PiShareFatBold className="h-8 w-8" />
              <span className="text-sm font-semibold">Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
