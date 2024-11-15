"use client";
import React, { useState, useEffect,use } from 'react';
import { IoSearch, IoMail } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { TbCircleArrowUpRight } from "react-icons/tb";
import { RiArrowDownWideFill } from "react-icons/ri";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import { useSession } from "next-auth/react";
import NewPost from '@/app/components/NewPost';
import Loading from '@/app/components/Loading';
import Link from "next/link";

const Page = ({params}) => {
  const { id } = use(params); // Use React.use() to unwrap the params  
  const { data: session } = useSession(); // Get the current session
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // Track like button state
  const [isDisliked, setIsDisliked] = useState(false); // Track dislike button state
  const [likeCount, setLikeCount] = useState("");
  const [dislikeCount, setDislikeCount] = useState("");
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [card, setCard] = useState(null);

  const handleNewPostClick = () => {
    setShowNewPost(true);
  };

  const handleHomeClick = () => {
    setShowNewPost(false);
  };

  useEffect(() => {
    if (session && card) {
      if (card.likedBy.includes(session.user.id)) setIsLiked(true);
      if (card.dislikedBy.includes(session.user.id)) setIsDisliked(true);
    }
  }, [session, card]); // Only run when session or card changes

  // Fetch post details and sentiment metrics
  useEffect(() => {
    if (id) {
      fetch(`/api/discussionforum/get?postId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setCard(data);
          setLikeCount(data.likedBy.length);
          setDislikeCount(data.dislikedBy.length);
          console.log("Fetched data : ",data);
        })
        .catch((error) => console.error("Error fetching post:", error));
    }
  }, [id]);

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
    <div className="grid grid-cols-1 md:grid-cols-5 h-screen overflow-hidden">
      {/* Left Column */}
      <div className="bg-black bg-opacity-95 p-4">
      <Link href={`/discussionforum`}>
          <div 
            className='flex items-center p-2 rounded-lg hover:bg-amber-600 text-amber-600 hover:text-stone-900 transition duration-200 cursor-pointer '
            // onClick={handleHomeClick}
          >
            <GoHome className='h-7 w-7' />
              <p className='px-2 font-bold'>Home</p>
          </div>
        </Link>
        <div className="flex items-center p-2 rounded-lg hover:bg-amber-600 text-amber-600 hover:text-stone-900 transition duration-200 cursor-pointer">
          <TbCircleArrowUpRight className='h-7 w-7' />
          <p className='px-2 font-bold'>Popular</p>
        </div>
        <div className={`flex items-center p-2 rounded-lg hover:bg-amber-600 text-amber-600 hover:text-stone-900 transition duration-200 cursor-pointer`}>
          <IoSearch className="h-7 w-7" />
          <p className='px-2 font-bold'>Explore</p>
        </div>
        <div className='flex items-center p-2 rounded-lg hover:bg-amber-600 text-amber-600 hover:text-stone-900 transition duration-200 cursor-pointer'>
          <IoMail className='h-6 w-6' />
          <p className='px-2 font-bold'>Message</p>
        </div>
        <hr className="my-4 border-slate-950" />
        <div className='px-2 font-semibold cursor-pointer p-2 rounded-lg hover:bg-amber-600 text-amber-600 hover:text-stone-900 transition duration-200' onClick={() => setIsTopicsOpen(!isTopicsOpen)}>
          <p className='flex flex-row items-center justify-between'>
            <span>Topic</span>
            <RiArrowDownWideFill className='h-6 w-6' />
          </p>
        </div>
        {isTopicsOpen && (
          <div className="px-2 pl-4 text-stone-50">
            <p>Topic 1</p>
            <p>Topic 2</p>
            <p>Topic 3</p>
          </div>
        )}
        <div className='px-2 font-semibold text-stone-50 cursor-pointer p-2 rounded-lg hover:bg-amber-600 hover:text-stone-900 transition duration-200' onClick={() => setIsResourcesOpen(!isResourcesOpen)}>
          <p className='flex flex-row items-center justify-between'>
            <span>Resources</span>
            <RiArrowDownWideFill className='h-6 w-6 ' />
          </p>
        </div>
        {isResourcesOpen && (
          <div className="px-2 pl-4 text-stone-50">
            <a href="https://hi.wikipedia.org/wiki/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4_%E0%A4%95%E0%A4%BE_%E0%A4%B8%E0%A4%82%E0%A4%B5%E0%A4%BF%E0%A4%A7%E0%A4%BE%E0%A4%A8">Wikipedia</a>
            <p><a href="https://www.youtube.com/watch?v=K65DEXrR9As">Youtube</a></p>
            <p>Resource 3</p>
          </div>
        )}
        <hr className="my-4 border-slate-400" />
        <div className='px-2 font-semibold text-slate-50'>
          <p>Help</p>
          <p>Blog</p>
          <p>Privacy Policy</p>
        </div>
        <div className='flex flex-col mt-24'>
          <button
            onClick={handleNewPostClick}
            className='bg-amber-600 rounded-xl px-16 py-2 font-bold text-md text-center cursor-pointer'>
              POST
          </button>
        </div>
      </div>

      {/* Conditional Middle Column */}
      <div className="col-span-4 md:col-span-4 flex flex-col overflow-hidden">
        <div
          className="flex-grow overflow-y-auto p-4"
          style={{
            backgroundImage: 'url(/bg3.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        {showNewPost ? (
          <div>
            <NewPost />
          </div>  
        ) : (
          card ? (
            <>
            {/* Detailed Post Card */}
            <div className="relative z-50 inset-0 w-full bg-zinc-950 bg-opacity-95 rounded-xl border border-amber-600/40 p-6">
                <div className="flex">
                {/* Left Side */}
                <div className="flex flex-col items-center space-y-4">
                    <img
                    className="h-16 w-16 rounded-full border border-amber-600/40"
                    // src={`/api/images/${card.user.profilePhoto}`}
                    src={card.user.profilePhoto=="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" ? `${card.user.profilePhoto}` : `/api/images/${card.user.profilePhoto}`}
                    alt="User Avatar"
                    />
                    <span className="text-stone-50 font-semibold">
                    {card.user.username}
                    </span>
                    <span className="text-stone-300 text-xs">
                    {card.timestamp}
                    </span>

                    <div className="flex flex-col items-center space-y-2">
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
                    {/* Comment Button */}
                    <button className="flex items-center space-x-1 text-amber-600">
                        <FaRegComment className="h-8 w-8" />
                        <span className="font-semibold">20</span>
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

                {/* Middle Section */}
                <div className="flex-grow mx-8">
                    <h1 className="text-3xl font-bold text-white">{card.title}</h1>

                      {/* Display tags below title */}
                      {card.tags && card.tags.length > 0 && (
                        <div className="px-4 py-2">
                          <div className="flex flex-wrap gap-2">
                            {card.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="text-sm text-amber-500 bg-amber-700/20 rounded-full px-3 py-1"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                       )}

                    <p className="text-gray-300 mt-4">{card.content}</p>
                </div>

                {/* Right Side */}
                {card.imageUrl && (
                    <div className="w-1/3">
                    <img
                        className="w-full h-full object-cover rounded-lg border border-amber-600/40"
                        src={`/api/images/${card.imageUrl}`}
                        alt="Post Image"
                    />
                    </div>
                )}
                </div>
            </div>
            </>
          ) : (
            <div><Loading /></div>
          )
        )}
        </div>
      </div>
 
    </div>
  );
};

export default Page;
