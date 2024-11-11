'use client';
import React, { useState,useEffect } from 'react';
import { useSession } from "next-auth/react";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';


const PostCard = ({ card, index }) => {
  const { data: session } = useSession(); // Get the current session
  const [isLiked, setIsLiked] = useState(false); // Track like button state
  const [isDisliked, setIsDisliked] = useState(false); // Track dislike button state
  const [likeCount, setLikeCount] = useState(card.likedBy.length);
  const [dislikeCount, setDislikeCount] = useState(card.dislikedBy.length);
  const router = useRouter();

  useEffect(() => {
    if (session && card) {
      // Check if the post was initially liked by the user
      // let temp = card.likedBy.indexOf(session.user.id);
      // if (temp !== -1) {
      //   setIsLiked(true); // Set as liked if user already liked the post
      // }
      // temp = card.dislikedBy.indexOf(session.user.id);
      // if (temp !== -1) {
      //   setIsDisliked(true); // Set as liked if user already liked the post
      // }
      if (card.likedBy.includes(session.user.id)) setIsLiked(true);
      if (card.dislikedBy.includes(session.user.id)) setIsDisliked(true);
    }
  }, [session, card]); // Only run when session or card changes

  const handleLikeClick = async () => {
    // Check if the user is logged in
    if (!session) {
      alert("You must be logged in to like a post.");
      return;
    }
  
    const userId = session.user.id;
    const postId = card._id; // Assuming `card.id` is the post ID
  
    try {
      const response = await fetch('/api/discussionforum/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId:postId, userId:userId}),
      });
  
      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        if (isDisliked){
          // setIsDisliked(false); // Ensure dislike is cleared if like is toggled on
          handleDislikeClick();
          setDislikeCount(dislikeCount - 1);
        } 
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
  

  const handleDislikeClick = async () => {    // Check if the user is logged in
    if (!session) {
      alert("You must be logged in to like a post.");
      return;
    }
  
    const userId = session.user.id;
    const postId = card._id; // Assuming `card.id` is the post ID
  
    try {
      const response = await fetch('/api/discussionforum/dislike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId:postId, userId:userId}),
      });
  
      if (response.ok) {
        setIsDisliked(!isDisliked);
        setDislikeCount(isDisliked ? dislikeCount - 1 : dislikeCount + 1);
        if (isLiked){
          // setIsLiked(false); // Ensure dislike is cleared if like is toggled on
          handleLikeClick();
          setLikeCount(likeCount - 1);
        }
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
  
  const handleShare = () => {
    const postUrl = `saral-samvidhan-oph5.vercel.app/discussionforum/posts/${card._id}`;
  
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = postUrl;
    
    // Append the textarea to the body (it needs to be in the DOM to work)
    document.body.appendChild(textarea);
    
    // Select the content of the textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
      // Execute the 'copy' command to copy the content to the clipboard
      document.execCommand('copy');
      alert('Post URL copied to clipboard!');
    } catch (error) {
      console.error('Error copying URL:', error);
      alert('Failed to copy URL.');
    }
  
    // Remove the textarea from the DOM
    document.body.removeChild(textarea);
  };

  return (
    <motion.div
      key={card.id}
      onClick={() => {
        router.push(`/discussionforum/posts/${card._id}`);  // Navigate to the detailed view
      }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full max-w-lg mb-4 cursor-pointer"
    >
      <div className="bg-zinc-950 bg-opacity-75 backdrop-blur-3xl border rounded-xl border-amber-600/40 cursor-pointer transform transition-all duration-200 ease-in-out hover:scale-95">
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
                <span className="text-md text-green-500 font-semibold">{likeCount}</span>
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
                <span className="text-md text-red-500 font-semibold">{dislikeCount}</span>
              </button>
            </div>
          </div>

            {/* Comment Button */}
            <button className="flex items-center space-x-1 p-2 rounded-full text-amber-600 hover:bg-amber-700/20 transition-all duration-200 ease-in-out">
              <FaRegComment className="h-8 w-8" />
              <span className="text-sm font-semibold">20</span>
            </button>

            {/* Share Button */}
            <button 
              className="flex items-center space-x-1 p-2 rounded-full text-amber-600 hover:bg-amber-700/20 transition-all duration-200 ease-in-out"
              onClick={handleShare}
            >
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
