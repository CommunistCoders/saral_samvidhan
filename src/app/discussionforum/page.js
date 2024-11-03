"use client";
import React, { useState } from 'react';
import { IoSearch, IoMail } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { TbCircleArrowUpRight } from "react-icons/tb";
import { RiArrowDownWideFill } from "react-icons/ri";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import { motion } from "framer-motion";

const Page = () => {
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [visibleCommunities, setVisibleCommunities] = useState(3);
  const currentTimestamp = Date.now(); 
  const date = new Date(currentTimestamp);
  const formattedDate = date.toLocaleString('en-US');

  const handleShowMore = () => {
    setVisibleCommunities(prev => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCommunities(3);
  };

  const cardData = [
    {
      id: 1,
      username: '8fact',
      location: 'Asheville, North Carolina',
      content: 'This is a text post. Lorem ipsum dolor sit amet...',
      avatarUrl: 'https://picsum.photos/id/1027/150/150',
    },
    {
      id: 2,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      avatarUrl: 'https://picsum.photos/id/1031/150/150',
    },
    {
      id: 2,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      avatarUrl: 'https://picsum.photos/id/1031/150/150',
    },
    {
      id: 2,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      avatarUrl: 'https://picsum.photos/id/1031/150/150',
    },
    {
      id: 2,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      avatarUrl: 'https://picsum.photos/id/1031/150/150',
    },
    {
      id: 2,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      avatarUrl: 'https://picsum.photos/id/1031/150/150',
    },
    {
      id: 2,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      avatarUrl: 'https://picsum.photos/id/1031/150/150',
    },
    {
      id: 2,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      avatarUrl: 'https://picsum.photos/id/1031/150/150',
    },
    {
      id: 2,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      avatarUrl: 'https://picsum.photos/id/1031/150/150',
    },
    // Add more card data as needed...
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-screen overflow-hidden">
      {/* Left Column */}
      <div className="bg-black bg-opacity-95 p-4">
        <div className='flex items-center p-2 rounded-lg hover:bg-amber-600 text-amber-600 hover:text-stone-900 transition duration-200 cursor-pointer'>
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
          <button className='bg-amber-600 rounded-xl px-16 py-2 font-bold text-md text-center cursor-pointer'>POST</button>
        </div>
      </div>

      {/* Middle Column for Posts */}
      <div className="col-span-1 md:col-span-3 flex flex-col overflow-hidden">
        <div
          className="flex-grow overflow-y-auto p-4"
          style={{
            backgroundImage: 'url(/bg3.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
          }}
        >
          <div className="flex flex-col items-center space-y-4 p-4 rounded-lg">
            <h1 className='font-bold text-2xl text-stone-50'>Posts</h1>
            {cardData.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                // whileInView={{opacity:1,x:50}} // Staggered animation
                className="w-full max-w-lg mb-4"
              >
                <div className="bg-zinc-950 bg-opacity-75 backdrop-blur-3xl border rounded-xl border-amber-600/40">
                  <div className="flex items-center px-4 py-3">
                    <img className="h-10 w-10 rounded-full border border-amber-600/40" src={card.avatarUrl} alt="Avatar" />
                    <div className="ml-3">
                      <span className="text-stone-50 text-sm font-semibold antialiased leading-tight flex flex-row">
                        {card.username}
                        <p className='text-xs ml-2 font-light'>{formattedDate}</p>
                      </span>
                      <span className="text-stone-50 text-xs block">{card.location}</span>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-gray-300">{card.content}</p>
                  </div>
                  <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                    <div className="flex items-center space-x-4">
                      <div className='space-x-2 flex flex-row  '>
                        <button className="p-1  rounded-full   text-amber-600 hover:border border-amber-600 ">
                          <LuArrowBigUp className='h-5 w-5' />
                        </button>
                        <span className="text-sm font-bold text-amber-600">{42}</span>
                        <button className="p-1 rounded-full  text-amber-600 hover:border border-amber-600">
                          <LuArrowBigDown className='h-5 w-5' />
                        </button>
                      </div>
                      <button className='px-2  rounded-full text-amber-600 flex flex-row hover:border border-amber-600'>
                        <FaRegComment className='h-5 w-5' />
                        <span className='text-sm '>20</span>
                      </button>
                      <button className='px-1.5  rounded-full text-amber-600 flex flex-row hover:border border-amber-600'>
                        <PiShareFatBold className='h-5 w-5' />
                        <span className='text-sm'>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="bg-amber-900 opacity-85 p-4 hidden md:block">
        <div className='max-w-full border border-amber-400 bg-black  rounded-lg'>
          <div className='text-slate-800 p-3 text-sm'>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
