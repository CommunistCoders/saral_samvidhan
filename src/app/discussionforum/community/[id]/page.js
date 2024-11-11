// app/api/discussionforum/community/[id]/route.js
"use client";
import React, { useState, useEffect, use } from 'react';
import { useSession, signOut } from "next-auth/react";
import Loading from '@/app/components/Loading';

const Page = ({params}) => {
    const { id } = use(params); // Use React.use() to unwrap the params  
    const { data: session, status } = useSession(); // Get session data and status
    const [Community, setCommunity] = useState(null);
    const [Posts, setPosts] = useState([]);
    const isRegistered = true;
    // Fetch post details and sentiment metrics
    useEffect(() => {
        if (id) {
        fetch(`/api/community/get?communityId=${id}`)
            .then((res) => res.json())
            .then((data) => {
            setCommunity(data);
            console.log("Fetched data : ",data);
            })
            .catch((error) => console.error("Error fetching post:", error));
        }
    }, [id]);

    // Function to load posts
    const loadPosts = async () => {
        try {
        const response = await fetch(`/api/discussionforum/get`);
        const newPosts = await response.json();
        setPosts(newPosts);
        } catch (error) {
        console.error("Error loading posts:", error);
        }
    };


    return (
        <div className="min-h-screen bg-cover bg-center text-yellow-400" style={{ backgroundImage: "url('/bg1.jpg')" }}>    
        {/* Header Section */}
        {Community ? (
            <header className="bg-black bg-opacity-90 p-6 md:p-8 lg:p-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
                    
                    {/* Profile Photo */}
                    <div className="flex-shrink-0">
                    <img
                        src={Community.imageUrl}
                        alt="Community Profile"
                        className="w-28 h-28 sm:w-36 sm:h-36 md:w-52 md:h-52 rounded-full border-4 border-yellow-400 shadow-xl object-cover"
                    />
                    </div>
                    
                    {/* Profile Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 sm:space-y-5">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white">{Community.name}</h2>
                    <div className="flex space-x-4 text-xl sm:text-2xl text-yellow-400 font-semibold">
                        <span>{Community.members.length} Members</span>
                        <span>|</span>
                        <span>{Community.posts.length} Posts</span>
                    </div>
                    <p className="text-gray-300 text-base sm:text-lg max-w-prose">
                        {Community.description}
                    </p>
                    
                    {/* Register Button */}
                    <button
                        // onClick={handleRegister} // Define this function for handling registration
                        className={`px-6 py-2 mt-4 text-lg font-semibold rounded-full transition-colors duration-300 
                            ${
                        isRegistered ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                        } hover:opacity-90`}
                    >
                        {isRegistered ? 'Registered' : 'Register'}
                    </button>
                    </div>
                </div>
            </header>

        ):(
            <Loading/>
        ) }
        </div>
  )   
}

export default Page;
