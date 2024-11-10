"use client";
import React, { useState, useEffect } from 'react';
import { IoSearch, IoMail } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { TbCircleArrowUpRight } from "react-icons/tb";
import { RiArrowDownWideFill } from "react-icons/ri";
import NewPost from '../components/NewPost';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const Page = () => {
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [visibleCommunities, setVisibleCommunities] = useState(3);
  const [showNewPost, setShowNewPost] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Function to load posts
  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/discussionforum/get?page=${page}&limit=3`);
      const newPosts = await response.json();
      setCardData(newPosts);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll event listener
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
  //       loadPosts();
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isLoading]);

  // Initial load
  useEffect(() => {
    loadPosts();
  }, []);


  const handleShowMore = () => {
    setVisibleCommunities(prev => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCommunities(3);
  };

  const handleNewPostClick = () => {
    setShowNewPost(true);
  };

  const handleHomeClick = () => {
    setShowNewPost(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-screen overflow-hidden">
      {/* Left Column */}
      <div className="bg-black bg-opacity-95 p-4">
        <div 
          className='flex items-center p-2 rounded-lg hover:bg-amber-600 text-amber-600 hover:text-stone-900 transition duration-200 cursor-pointer '
          onClick={handleHomeClick}
        >
          <GoHome className='h-7 w-7' />
          <p className='px-2 font-bold'>Home</p>
        </div>
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
      <div className="col-span-1 md:col-span-3 flex flex-col overflow-hidden">
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
              <div className="flex flex-col items-center space-y-4 p-4 rounded-lg ">
                <h1 className="font-bold text-2xl text-stone-50  fixed z-[10] px-4 py-2 bg-black/70 rounded-lg shadow-md">
                  Posts
                </h1>
                  {cardData.map((card, index) => (
                    <PostCard card={card} index={index} key={index}/>
                  ))}
                  {/* {isLoading && <p>Loading more posts...</p>} */}
                  {isLoading && <Loading />}
              </div>
          )}
        </div>
      </div>

      {/* Right Column - Hidden in New Post View */}
      {/* {!showNewPost && ( */}
        <div className="bg-amber-900 opacity-85 p-4 hidden md:block">
          <div className='max-w-full border border-amber-400 bg-black rounded-lg '>
            {/* <div className='text-slate-800 p-3 text-sm'>
              <p>POPULAR COMMUNITIES</p>
              {cardData.slice(0, visibleCommunities).map(card => (
                <div key={card.id} className="flex items-center my-2">
                  <img className="h-10 w-10 rounded-full" src={card.avatarUrl} alt="Avatar" />
                  <div className="ml-2 text-black">
                    <p>Panda</p>
                    <p>222,234 Members</p>
                    <hr className="my-4 border-slate-400" />
                  </div>
                </div>
              ))}

              {visibleCommunities < cardData.length ? (
                <button className='text-blue-400 text-sm' onClick={handleShowMore}>Show more..</button>
              ) : (
                <button className='text-blue-400 text-sm' onClick={handleShowLess}>Show less..</button>
              )}
            </div> */}
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default Page;
