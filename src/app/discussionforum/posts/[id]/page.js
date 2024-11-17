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
  const [isLoading, setIsLoading] = useState(false);
  const [communities,setCommunityData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleNewPostClick = () => {
    setShowNewPost(true);
  };


  // Function to load communities
  const loadCommunities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/community/get`);
      const newCommunities = await response.json();
      setCommunityData(newCommunities);
    } catch (error) {
      console.error("Error loading communities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadCommunities();
  }, []);

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

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div className="grid grid-cols-1 md:grid-cols-5 h-screen overflow-hidden relative">
      
      {/* Left Sidebar for Desktop */}
      <div className="hidden md:block bg-black bg-opacity-95 p-4 md:col-span-1">

        {/* Home Button */}
        <Link href={`/discussionforum/`}>
          <div className="flex items-center p-2 rounded-lg hover:bg-amber-600 text-amber-600 hover:text-stone-900 transition duration-200 cursor-pointer">
            <GoHome className="h-7 w-7" />
            <p className="px-2 font-bold">Home</p>
          </div>
        </Link>

        {/* Communities Section */}
        <div className="bg-gradient-to-r mt-5 from-amber-900 to-black/70 p-4 rounded-lg shadow-lg">
          <div className="max-w-full border border-amber-400 bg-black rounded-lg overflow-hidden">
            <div className="text-white p-4 text-sm">
              <p className="text-lg font-semibold text-amber-400 mb-4">COMMUNITIES</p>
              {communities ? (
                <div className="overflow-y-auto pr-2 max-h-[50vh]">
                  {communities.map((community, index) => (
                    <Link href={`/discussionforum/community/${community._id}`} key={index}>
                      <div className="flex items-start my-2 p-3 rounded-lg transition-all duration-150 hover:bg-black/30 cursor-pointer">
                        <img
                          className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-amber-400 object-cover"
                          src={community.imageUrl}
                          alt={`${community.name}`}
                        />
                        <div className="ml-3 text-amber-200">
                          <p className="font-semibold text-sm md:text-md">{community.name}</p>
                          <p className="text-xs font-light text-amber-400">{community.members.length} Members</p>
                          <p className="text-xs mt-1 text-gray-300 hidden md:block">{community.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>

        {/* Post Button */}
        <div className="flex flex-col mt-5">
          <button
            onClick={handleNewPostClick}
            className="bg-amber-600 rounded-xl px-16 py-2 font-bold text-md text-center cursor-pointer"
          >
            POST
          </button>
        </div>

      </div>

      {/* Slide-in Sidebar for Mobile */}
      <div
        className={`fixed left-0 top-10b h-full w-3/4 bg-black bg-opacity-95 p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="mt-5 bg-gradient-to-r from-amber-900 to-black/70 p-4 rounded-lg shadow-lg">
          <div className="max-w-full border border-amber-400 bg-black rounded-lg overflow-hidden">
            <div className="text-white p-4 text-sm">
              <p className="text-lg font-semibold text-amber-400 mb-4">COMMUNITIES</p>
              {communities ? (
                <div className="overflow-y-auto pr-2 max-h-[70vh]">
                  {communities.map((community, index) => (
                    <Link href={`/discussionforum/community/${community._id}`} key={index}>
                      <div className="flex items-start my-2 p-3 rounded-lg transition-all duration-150 hover:bg-black/30 cursor-pointer">
                        <img
                          className="h-10 w-10 rounded-full border-2 border-amber-400 object-cover"
                          src={community.imageUrl}
                          alt={`${community.name}`}
                        />
                        <div className="ml-3 text-amber-200">
                          <p className="font-semibold text-sm">{community.name}</p>
                          <p className="text-xs font-light text-amber-400">{community.members.length} Members</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>
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
                <div className="relative inset-0 w-full bg-zinc-950 bg-opacity-95 rounded-xl border border-amber-600/40 p-6">
                  <div className="flex flex-col md:flex-row">
                    {/* Left Side - Profile and Interaction Buttons */}
                    <div className="flex flex-col items-center space-y-4 md:w-1/3">
                      <img
                        className="h-16 w-16 rounded-full border border-amber-600/40 object-cover"
                        src={card.user.profilePhoto=="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" ? `${card.user.profilePhoto}` : `/api/images/${card.user.profilePhoto}`}
                        alt="User Avatar"
                      />
                      <span className="text-stone-50 font-semibold">
                        {card.user.username}
                      </span>
                      <span className="text-stone-300 text-xs">
                        {card.timestamp}
                      </span>

                      <div className="flex lg:flex-col md:flex-row space-y-2">
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

                    {/* Middle Section - Post Content */}
                    <div className="flex-grow mx-8 mt-4 md:mt-0 md:w-2/3">
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

                    {/* Right Side - Image */}
                    {card.imageUrl && (
                      <div className="w-full md:w-1/3 mt-4 md:mt-0">
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

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-10 left-4 md:hidden right-4 z-50 flex justify-between">

        {/* Home Button */}
        <Link href={`/discussionforum/`}>
          <button
            className="bg-amber-600 text-white p-3 rounded-full shadow-lg w-14 h-14 flex items-center justify-center"
          >
            <GoHome className="h-6 w-6" />
          </button>
        </Link>

        {/* Post Button */}
        <button
          onClick={handleNewPostClick}
          className="bg-amber-600 text-white p-3 rounded-full shadow-lg w-14 h-14 flex items-center justify-center"
        >
          <span className="text-lg font-bold">+</span>
        </button>


        {/* Sidebar Communities Toggle Button for Mobile */}
        <button
          onClick={handleToggleSidebar}
          className="md:hidden fixed top-40 left-0 bg-amber-600 text-white p-3 rounded-r-lg shadow-md z-50"
        >
          {isSidebarOpen ? "Close" : "Communities"}
        </button>
      </div>

    </div>
  );
};

export default Page;
