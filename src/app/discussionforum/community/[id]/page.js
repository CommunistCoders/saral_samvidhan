// app/api/discussionforum/community/[id]/route.js
"use client";
import React, { useState, useEffect, use } from 'react';
import { useSession, signOut } from "next-auth/react";
import Loading from '@/app/components/Loading';
import PostCard from '@/app/components/PostCard';
import Link from "next/link";
import { GoHome } from "react-icons/go";

const Page = ({params}) => {
    const { id } = use(params); // Use React.use() to unwrap the params  
    const { data: session, status } = useSession(); // Get session data and status
    const [Community, setCommunity] = useState(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [Posts, setPosts] = useState([]);
    const [isRegistered, setRegistered] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [communities,setCommunityData] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 h-screen overflow-hidden relative text-yellow-400" >    
                  
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
                                className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-amber-400"
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

                </div>

            {/* Slide-in Sidebar for Mobile */}
            <div
            className={`fixed left-0 top-12 h-full w-3/4 bg-black bg-opacity-95 p-4 transform ${
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
                                    className="h-10 w-10 rounded-full border-2 border-amber-400"
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

            {/* Main Content */}
            <div 
                className="relative col-span-4 md:col-span-4  overflow-hidden"          
                style={{
                    backgroundImage: 'url(/bg3.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
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
                <div className="flex flex-wrap justify-center relative"> {/* Add margin to avoid overlap with header */}
                    <h1 className="font-bold text-2xl text-stone-50  fixed z-[10] px-4 py-2 bg-black/70 rounded-lg shadow-md">
                    Community Posts
                    </h1>
                    <div className="flex flex-wrap justify-center gap-5 space-y-4 p-4 rounded-lg overflow-y-auto max-h-screen">
                    {Posts.map((card, index) => (
                        <Link href={`/discussionforum/posts/${card._id}`} key={index}>
                        <PostCard card={card} index={index} />
                        </Link>
                    ))}
                    </div>
                </div>
                ) : (
                <Loading />
                )}

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

                {/* Sidebar Communities Toggle Button for Mobile */}
                <button
                onClick={handleToggleSidebar}
                className="md:hidden fixed top-40 left-0 bg-amber-600 text-white p-3 rounded-r-lg shadow-md z-50"
                >
                {isSidebarOpen ? "Close" : "Communities"}
                </button>
            </div>

        </div>
  )   
}

export default Page;
