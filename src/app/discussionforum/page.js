"use client";
import React, { useState } from 'react';

const Page = () => {
  // State for dropdowns
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const [visibleCommunities, setVisibleCommunities] = useState(3); // Start by showing 3 communities

const handleShowMore = () => {
  setVisibleCommunities(prev => prev + 3); // Increase by 3
};

const handleShowLess = () => {
  setVisibleCommunities(3); // Reset to show 3
};

  // Array of card data (text posts only)
  const cardData = [
    {
      id: 1,
      username: '8fact',
      location: 'Asheville, North Carolina',
      content: 'This is a text post. Lorem ipsum dolor sit amet. The spelling mistakes in the text had been highlighted in green. The text is finished, but the pictures will have to be pasted in later. The students are reading "Lord of the Flies" as one of their set texts this year.',
      likes: '92,372',
      avatarUrl: 'https://picsum.photos/id/1027/150/150',
    },
    {
      id: 2,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      likes: '53,120',
      avatarUrl: 'https://picsum.photos/id/1031/150/150',
    },
    {
      id: 3,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here. Hi, my name is Lavkush Kumar. I am from Ranchi, Jharkhand.',
      likes: '53,120',
      avatarUrl: 'https://picsum.photos/id/1032/150/150',
    },
    {
      id: 4,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      likes: '53,120',
      avatarUrl: 'https://picsum.photos/id/1035/150/150',
    },
    {
      id: 5,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      likes: '53,120',
      avatarUrl: 'https://picsum.photos/id/1037/150/150',
    },
    {
      id: 5,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      likes: '53,120',
      avatarUrl: 'https://picsum.photos/id/1037/150/150',
    },
    {
      id: 5,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      likes: '53,120',
      avatarUrl: 'https://picsum.photos/id/1057/150/150',
    },
    {
      id: 5,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      likes: '53,120',
      avatarUrl: 'https://picsum.photos/id/1037/150/150',
    },
    {
      id: 5,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      likes: '53,120',
      avatarUrl: 'https://picsum.photos/id/1047/150/150',
    },
    {
      id: 5,
      username: 'anotherUser',
      location: 'Somewhere, USA',
      content: 'Another interesting text post goes here.',
      likes: '53,120',
      avatarUrl: 'https://picsum.photos/id/1043/150/150',
    },
    // Add more text posts as needed...
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-screen overflow-hidden">
      {/* Left Column */}
      <div className="bg-zinc-100 p-4 border-x-2 border-slate-300 rounded-sm">
        <div className='flex items-center p-2 rounded-lg hover:bg-slate-400 transition duration-200 cursor-pointer'>
          <svg className="h-7 w-7 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <p className='px-2 font-bold text-slate-700'>Home</p>
        </div>

        <div className='flex items-center p-2 rounded-lg hover:bg-slate-400 transition duration-200 cursor-pointer'>
        <svg class="h-7 w-7 text-slate-800"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="15" y1="9" x2="9" y2="15" />  <polyline points="15 15 15 9 9 9" /></svg>
          <p className='px-2 font-bold text-slate-700'>Popular</p>
        </div>
        <div className='flex items-center p-2 rounded-lg hover:bg-slate-400 transition duration-200 cursor-pointer'>
        <svg class="h-7 w-7 text-slate-800"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="10" cy="10" r="7" />  <line x1="21" y1="21" x2="15" y2="15" /></svg>
          <p className='px-2 font-bold text-slate-700'>Explore</p>
        </div>
        <div className='flex items-center p-2 rounded-lg hover:bg-slate-400 transition duration-200 cursor-pointer'>
        <svg class="h-7 w-7 text-slate-800"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
          <p className='px-2 font-bold text-slate-700'>Message</p>
        </div>

        <hr className="my-4 border-slate-400" />

        <div className='px-2 font-semibold text-slate-800 cursor-pointer p-2 rounded-lg hover:bg-slate-400 transition duration-200' onClick={() => setIsTopicsOpen(!isTopicsOpen)}>
          <p className='flex flex-row items-center justify-between'>
            <span>Topic</span>
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
            <a href="https://hi.wikipedia.org/wiki/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4_%E0%A4%95%E0%A4%BE_%E0%A4%B8%E0%A4%82%E0%A4%B5%E0%A4%BF%E0%A4%A7%E0%A4%BE%E0%A4%A8">Wikipedia</a>
            <p><a href="https://www.youtube.com/watch?v=K65DEXrR9As">Youtube</a></p>
            <p>Resource 3</p>
          </div>
        )}

        <hr className="my-4 border-slate-400" />
        <div className='px-2 font-semibold text-slate-800'>
          <p>Help</p>
          <p>Blog</p>
          <p>Privacy Policy</p>
        </div>

        <div className='flex flex-col mt-24'>
          <button className='bg-blue-600 rounded-xl px-16 py-2 font-bold text-md text-center hover:bg-blue-500 transition duration-200 cursor-pointer'>POST</button>
        </div>
      </div>

      {/* Middle Column for Posts */}
      <div className="col-span-1 md:col-span-3 flex flex-col overflow-hidden bg-gray-100">
        <div className="flex-grow overflow-y-auto p-4">
          <div className="flex flex-col items-center space-y-4">
            <h1 className='font-bold text-2xl'>Posts</h1>
            {cardData.map(card => (
              <div key={card.id} className="w-full max-w-lg">
                <div className="bg-slate-50 border rounded-xl border-slate-400">
                  <div className="flex items-center px-4 py-3">
                    <img className="h-10 w-10 rounded-full" src={card.avatarUrl} alt="Avatar" />
                    <div className="ml-3">
                      
                      
                      <span className="text-sm font-semibold antialiased  leading-tight flex flex-row">{card.username}
                        <p className='text-xs ml-2 font-light'>2 hr.ago</p>
                      </span>
                      
                      
                      <span className="text-gray-600 text-xs block">{card.location}</span>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-gray-800">{card.content}</p>
                  </div>
                  <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                    <div className="flex items-center space-x-4">
                      <div className='space-x-2 flex flex-row'>
                        <button className="p-1 border rounded-full hover:bg-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z"/>
                          </svg>
                        </button>
                        <span className="text-sm font-bold">42</span>
                        <button className="p-1 border rounded-full hover:bg-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20.901 10.566A1 1 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059M12 19.399L6.081 12H10V4h4v8h3.919z"/>
                          </svg>
                        </button>
                      </div>

                      <button className='px-2 border rounded-full border-zinc-300 hover:bg-gray-200 flex flex-row'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.89 1 4.127L3 21l4.873-1c1.236.639 2.64 1 4.127 1"/>
                        </svg>
                        <span className='text-sm'>20</span>
                      </button>

                      <button className='px-1.5 border rounded-full border-zinc-300 hover:bg-gray-200 flex flex-row'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className='mr-1'>
                          <path fill="currentColor" d="m21.707 11.293l-8-8A1 1 0 0 0 12 4v3.545A11.015 11.015 0 0 0 2 18.5V20a1 1 0 0 0 1.784.62a11.46 11.46 0 0 1 7.887-4.049c.05-.006.175-.016.329-.026V20a1 1 0 0 0 1.707.707l8-8a1 1 0 0 0 0-1.414M14 17.586V15.5a1 1 0 0 0-1-1c-.255 0-1.296.05-1.562.085a14 14 0 0 0-7.386 2.948A9.013 9.013 0 0 1 13 9.5a1 1 0 0 0 1-1V6.414L19.586 12Z"/>
                        </svg>
                        <span className='text-sm'>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="bg-slate-100 p-4 hidden md:block">
    <div className='max-w-full border border-slate-400  rounded-lg'>
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
