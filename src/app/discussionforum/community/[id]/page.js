// app/api/discussionforum/community/[id]/route.js
"use client";
import React, { useState, useEffect, use } from 'react';
import { useSession, signOut } from "next-auth/react";
import Loading from '@/app/components/Loading';
import PostCard from '@/app/components/PostCard';
import Link from "next/link";

const Page = ({params}) => {
    const { id } = use(params); // Use React.use() to unwrap the params  
    const { data: session, status } = useSession(); // Get session data and status
    const [Community, setCommunity] = useState(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [Posts, setPosts] = useState([]);
    const [isRegistered, setRegistered] = useState(false);
    const [countdown, setCountdown] = useState(3);

    // Function to handle registration
    const handleRegister = async () => {
        if (!session) {
            // Show login popup if no session
            setShowLoginPopup(true);
            let timer = 3;
            const countdownInterval = setInterval(() => {
                setCountdown((prev) => prev - 1);
                timer -= 1;
                if (timer <= 0) {
                    clearInterval(countdownInterval);
                    setShowLoginPopup(false);
                    setCountdown(3);
                    // Redirect to login or handle as needed
                    // window.location.href = '/login'; // Adjust login route as needed
                }
            }, 1000);
            return;
        }
    
        try {
            // Call API to register user to community
            const response = await fetch('/api/community/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: session.user.id, communityId: id }), // Pass the current community ID and session user ID
            });
    
            if (response.ok) {
                setRegistered(true); // Update state to reflect registration
            } else {
                console.error("Failed to register to community");
            }
        } catch (error) {
            console.error("Error registering to community:", error);
        }
    };
    

    // Function to handle deregistration
    const handleDeregister = async () => {
        if (!session) {
            // Show login popup if no session
            setShowLoginPopup(true);
            let timer = 3;
            const countdownInterval = setInterval(() => {
                setCountdown((prev) => prev - 1);
                timer -= 1;
                if (timer <= 0) {
                    clearInterval(countdownInterval);
                    setShowLoginPopup(false);
                    setCountdown(3);
                    // Redirect to login or handle as needed
                    // window.location.href = '/login'; // Adjust login route as needed
                }
            }, 1000);
            return;
        }
    
        try {
            // Call API to deregister user from community
            const response = await fetch('/api/community/deregister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: session.user.id, communityId: id }), // Pass the current community ID and session user ID
            });
    
            if (response.ok) {
                setRegistered(false); // Update state to reflect deregistration
            } else {
                console.error("Failed to deregister from community");
            }
        } catch (error) {
            console.error("Error deregistering from community:", error);
        }
    };
    

    useEffect(() => {
        if (session && session.user?.communitiesJoined) {
            // Directly compare communityId and the communitiesJoined as strings
            const isMember = session.user.communitiesJoined.some(
                (community) => community.toString() === id
            );
    
            setRegistered(isMember);
        }
    }, [session, id]); // Dependency array includes session and id
    
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
        // Call loadPosts to retrieve the posts when needed
    }, [id]);

    // Function to load posts
    const loadPosts = async () => {
        if (!Community?.tags) return; // Ensure Community and tags are defined
        try {
            // Build the query string with tags from Community.tags
            const tagsQuery = Community.tags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
            
            // Fetch posts with the tags as query parameters
            const response = await fetch(`/api/discussionforum/get?${tagsQuery}`);
            const newPosts = await response.json();
            console.log(newPosts);
            setPosts(newPosts);
        } catch (error) {
            console.error("Error loading posts:", error);
        }
    };

    // useEffect to load posts when Community changes
    useEffect(() => {
        loadPosts();
    }, [Community]); // Dependency on Community to re-fetch when it changes


    return (
        <div className="min-h-screen bg-cover bg-center text-yellow-400" style={{ backgroundImage: "url('/bg1.jpg')" }}>    
            {/* Header Section */}
            {Community ? (
                <header className="bg-black bg-opacity-90 p-6 md:p-8 lg:p-10">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
                        
                        {/* Community Photo */}
                        <div className="flex-shrink-0">
                        <img
                            src={Community.imageUrl}
                            alt="Community Profile"
                            className="w-28 h-28 sm:w-36 sm:h-36 md:w-52 md:h-52 rounded-full border-4 border-yellow-400 shadow-xl object-cover"
                        />
                        </div>
                        
                        {/* Community Info */}
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
                                    
                        {/* Register/Deregister Buttons */}
                        <button
                        onClick={handleRegister}
                        className={`px-6 py-2 mt-4 text-lg font-semibold rounded-full transition-colors duration-300 
                            ${isRegistered ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}
                            hover:opacity-90`}
                        >
                        {isRegistered ? 'Registered' : 'Register'}
                        </button>

                        {isRegistered && (
                            <button
                                onClick={handleDeregister}
                                className="px-6 py-2 mt-4 ml-4 text-lg font-semibold rounded-full bg-red-500 text-white hover:opacity-90 transition-colors duration-300"
                            >
                                Deregister
                            </button>
                        )}

                        {/* Warning Popup */}
                        {showLoginPopup && (
                            <div className="fixed mx-auto inset-0 z-50 flex flex-col items-center justify-center ">
                                <div className="bg-gray-100 p-4 rounded-md">
                                <p className="bg-yellow-100 bg-gray-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md font-semibold mb-4">
                                    ⚠️ Login to use the register to this community
                                </p>
                                <p className="text-gray-700">
                                    Message disappearing in <span className="font-bold">{countdown}</span> seconds...
                                </p>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </header>

            ):(
                <Loading/>
            ) }

            {/* Posts */}
            {Posts ? (
            <div className="flex flex-wrap justify-center gap-5 space-y-4 p-4 rounded-lg ">
                <h1 className="font-bold text-2xl text-stone-50  fixed z-[10] px-4 py-2 bg-black/70 rounded-lg shadow-md">
                Community Posts
                </h1>
                {Posts.map((card, index) => (
                <Link href={`/discussionforum/posts/${card._id}`} key={index}>
                    <PostCard card={card} index={index} />
                </Link>
                ))}
            </div>
            ):(
                <Loading />
            )}
        </div>
  )   
}

export default Page;
