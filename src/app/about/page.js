"use client";
import React, { useState } from 'react';

const Page = () => {
  // State for dropdowns
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  // Array of card data
  const cardData = [
    {
      id: 1,
      username: '8fact',
      location: 'Asheville, North Carolina',
      imageUrl: 'https://picsum.photos/id/244/900/900',
      likes: '92,372',
      avatarUrl: 'https://picsum.photos/id/1027/150/150',
    },
    {
      id: 1,
      username: '8fact',
      location: 'Asheville, North Carolina',
      imageUrl: 'https://picsum.photos/id/244/900/900',
      likes: '92,372',
      avatarUrl: 'https://picsum.photos/id/1027/150/150',
    },
    {
      id: 1,
      username: '8fact',
      location: 'Asheville, North Carolina',
      imageUrl: 'https://picsum.photos/id/244/900/900',
      likes: '92,372',
      avatarUrl: 'https://picsum.photos/id/1027/150/150',
    },
    // More data...
  ];

  return (
    <>
      <div className="grid grid-cols-5 h-screen overflow-hidden">
        {/* Left Column */}
        <div className="bg-slate-300 p-4">
          <div className='flex items-center p-2 rounded-lg hover:bg-slate-400 transition duration-200'>
            <svg className="h-7 w-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <p className='px-2 font-bold text-slate-700'>Home</p>
          </div>
          <div className='flex items-center p-2 rounded-lg hover:bg-slate-400 transition duration-200'>
            <svg className="h-7 w-7 text-slate-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="12" r="9" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <polyline points="15 15 15 9 9 9" />
            </svg>
            <p className='px-2 font-bold text-slate-700'>Popular</p>
          </div>

          <hr className="my-4 border-slate-400" />

          <div className='px-2 font-semibold text-slate-800 cursor-pointer p-2 rounded-lg hover:bg-slate-400 transition duration-200' onClick={() => setIsTopicsOpen(!isTopicsOpen)}>
          <p className='flex flex-row items-center justify-between'>
              <span >Topic</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </p>

          </div>


          {isTopicsOpen && (
            <div className="px-2 pl-4 text-slate-600">
              <p>Topic 1</p>
              <p>Topic 2</p>
              <p>Topic 3</p>
            </div>
          )}

          <div className='px-2 font-semibold text-slate-800 cursor-pointer p-2 rounded-lg hover:bg-slate-400 transition duration-200' onClick={() => setIsResourcesOpen(!isResourcesOpen)}>
            <p className='flex flex-row items-center justify-between'>
              <span>Resources</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </p>


          </div>


          {isResourcesOpen && (
            <div className="px-2 pl-4 text-slate-600">
              <p>Resource 1</p>
              <p>Resource 2</p>
              <p>Resource 3</p>
            </div>
          )}

          <hr className="my-4 border-slate-400" />
          <div className='px-2 font-semibold text-slate-800'>
            <p>Help</p>
            <p>Blog</p>
            <p>Privacy Policy</p>
          </div>
        </div>

        {/* Middle Column for Posts */}
        <div className="col-span-3 flex flex-col overflow-hidden">
          <div className="flex-grow overflow-y-auto p-4">
            <div className="flex flex-col items-center space-y-4">
              <h1 className='font-bold text-2xl '>Posts</h1>
              {cardData.map(card => (
                <div key={card.id} className="bg-gray-400 p-4 border rounded-2xl">
                  <div className="bg-white border rounded-2xl w-2/3 ml-28">
                    <div className="flex items-center px-4 py-3">
                      <img className="h-10 w-10 rounded-full" src={card.avatarUrl} alt="Avatar" />
                      <div className="ml-3">
                        <span className="text-sm font-semibold antialiased block leading-tight">{card.username}</span>
                        <span className="text-gray-600 text-xs block">{card.location}</span>
                      </div>
                    </div>
                    <img src={card.imageUrl} alt="Post" />
                    <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                      <div className="flex gap-5">
                        {/* Replace with your actual icons */}
                        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>

                        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path></svg>

                        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                      </div>
                      <div className="flex">
                        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="..."></path></svg>
                      </div>
                    </div>
                    <div className="font-semibold text-sm mx-4 mt-2 mb-4">{card.likes} likes</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-slate-300 p-4">
          <div className='max-w-full max-h-full border-2 border-black bg-slate-700 rounded-lg'>
            <div className='text-slate-300 p-3'>
              <p>POPULAR COMMUNITIES</p>
              {cardData.map(card => (
                <div key={card.id} className="flex items-center my-2">
                  <img className="h-10 w-10 rounded-full" src={card.avatarUrl} alt="Avatar" />
                  <div className="ml-2 text-slate-200">
                    <p>Panda</p>
                    <p>222,234 Members</p>
                    <hr className="my-4 border-slate-400" />
                  </div>
                 
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
