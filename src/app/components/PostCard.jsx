'use client';
import React from 'react';
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import { motion } from "framer-motion";

const PostCard = ({ card, index }) => {
  const currentTimestamp = Date.now(); 
  const date = new Date(currentTimestamp);
  const formattedDate = date.toLocaleString('en-US');
  return (
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
  );
};

export default PostCard;
