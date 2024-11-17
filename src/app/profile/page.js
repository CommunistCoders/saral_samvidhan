// app/profile/page.js
"use client";
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import PostCard from '../components/PostCard';
import CreateCommunity from '../components/CreateCommunity';

function Profile() {
  const { data: session, status } = useSession(); // Get session data and status
  const [photoUrl, setPhotoUrl] = useState(); // Default placeholder URL
  const [newPhoto, setNewPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [countdown, setCountdown] = useState(5); // Countdown starting at 5 seconds
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [tempAboutMe, setTempAboutMe] = useState("");
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  // If the user is not logged in
  useEffect(() => {
    if (!session) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer); // Clear timer when countdown ends
            if (typeof window !== "undefined") {
              window.location.href = "/login"; // Adjust to your protected route
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on component unmount
    }
  }, [session]);

  // Hook to load posts after session is available
  useEffect(() => {
    if (session) {
      setAboutMe(session.user.aboutMe);
      setTempAboutMe(session.user.aboutMe);
      loadPosts(); // Load posts when session is available
    }
  }, [session]); // This effect runs every time session changes

  // Function to load posts
  const loadPosts = async () => {
    try {
      const response = await fetch(`/api/discussionforum/get?userId=${session.user.id}`);
      const newPosts = await response.json();
      setCardData(newPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  // Unauthorized access message with countdown
  if (!session) {
    return (
      <div className="my-5 flex flex-col items-center justify-center bg-gray-100">
        <p className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md font-semibold mb-4">
          ⚠️ Login to check your profile
        </p>
        <p className="text-gray-700">
          Redirecting to the Login page in <span className="font-bold">{countdown}</span> seconds...
        </p>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(file);
    }
  };

  const handleUpload = async () => {
    if (!newPhoto) return;

    setIsUploading(true);
    setUploadSuccess(false); // Reset upload success state

    const formData = new FormData();
    formData.append('file', newPhoto);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setPhotoUrl(data.url); // Set the uploaded image URL
        console.log("photoUrl : ",photoUrl);
        setUploadSuccess(true); // Set upload success message
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirmPhoto = async () => {
    try {

      const response = await fetch('/api/updateprofile', {
        method: 'POST',
        body: JSON.stringify({ profilePhoto: photoUrl, userId: session.user.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Success: Update session and show message
        setIsSuccess(true); // Show success message with animation
        setTimeout(() => {
          setIsSuccess(false); // Hide message after some time (animation duration)
        }, 3000); // Adjust the time for the animation
      } else {
        console.error("Error: ", data.message);
      }
    } catch (error) {
      console.error('Error updating profile photo:', error);
    }
  };

  const handleEdit = () => {
    setTempAboutMe(aboutMe); // Reset temp value on edit
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/user/updateAboutMe', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id, // Pass user ID
          aboutMe: tempAboutMe,    // Pass updated aboutMe
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update About Me section');
      }
  
      const data = await response.json();
      setAboutMe(data.aboutMe); // Update the aboutMe state
      setIsEditing(false);      // Exit edit mode
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    // Optionally, you could update the UI or add custom logic after logging out
  };

// Retrieve all tags and save them in a list
const tagsList = cardData.flatMap(post => post.tags);

// Remove duplicates if needed
const uniqueTagsList = [...new Set(tagsList)];

const defaultProfilePhoto = "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg";

  return (
    <div
  className="min-h-screen bg-cover bg-center text-yellow-400"
  style={{ backgroundImage: "url('/bg1.jpg')" }}
>
  {/* Header Section */}
  <header className="bg-black bg-opacity-80 p-4 sm:p-6 md:p-8">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
      {/* Profile Photo */}
      <div className="flex-shrink-0">
        <img
          src={session.user.profilePhoto === defaultProfilePhoto ? defaultProfilePhoto : `/api/images/${session.user.profilePhoto}`}
          alt="Profile"
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
        />
        {isSuccess && (
          <div className="fixed top-20 left-4 sm:left-10 z-100 w-[90%] max-w-xs px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg">
            Profile Photo Updated Successfully! Logout and Login to see the changes
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">{session.user.username}</h2>
        <p className="text-gray-300 text-sm sm:text-base">{session.user.email}</p>
        <p className="text-gray-300">
          Language Preference: <span className="text-yellow-400">{session.user.languagePreference}</span>
        </p>

        {!showUploadOptions && (
          <button
            onClick={() => setShowUploadOptions(true)}
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
          >
            Change Profile Picture?
          </button>
        )}

        {showUploadOptions && (
          <div className="mt-4 w-full max-w-xs">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="block w-full mt-2"
            />
            <button
              onClick={handleUpload}
              disabled={isUploading || !newPhoto}
              className={`mt-2 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 ${isUploading ? 'cursor-not-allowed' : ''}`}
            >
              {isUploading ? 'Uploading...' : 'Upload Photo'}
            </button>
            {uploadSuccess && !isUploading && (
              <p className="text-green-500 mt-2">Photo uploaded successfully!</p>
            )}
            {!isUploading && uploadSuccess && (
              <button
                onClick={handleConfirmPhoto}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Confirm Photo
              </button>
            )}
          </div>
        )}

        <button
          onClick={handleSignOut}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  </header>

  {/* Main Content */}
  <main className="max-w-5xl mx-auto mt-6 sm:mt-8 p-4 sm:p-6 space-y-6 bg-black bg-opacity-75 rounded-lg shadow-lg">
    {/* About Me Section */}
    <section className="text-sm sm:text-base text-gray-300 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-yellow-400">About Me</h3>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
        )}
      </div>
      {!isEditing ? (
        <p>{aboutMe || "This user hasn't added anything about themselves yet."}</p>
      ) : (
        <div>
          <textarea
            value={tempAboutMe}
            onChange={(e) => setTempAboutMe(e.target.value)}
            className="w-full p-2 border rounded-lg text-gray-800"
            rows="4"
          />
          <button
            onClick={handleSubmit}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      )}
    </section>

    {/* Tags Section */}
    <section className="text-sm sm:text-base text-gray-300 space-y-4">
      <h3 className="text-xl font-semibold text-yellow-400">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {uniqueTagsList.map((tag) => (
          <span key={tag} className="bg-yellow-400 text-black py-1 px-3 rounded-full text-xs font-semibold">
            #{tag}
          </span>
        ))}
      </div>
    </section>

    {/* Communities Joined Section */}
    <section className="text-sm sm:text-base text-gray-300 space-y-4">
      <h3 className="text-xl font-semibold text-yellow-400">Communities Joined</h3>
      <ul className="list-disc list-inside space-y-2">
        {session.user.communitiesJoined.map((community) => (
          <li key={community._id}>{community.name}</li>
        ))}
      </ul>
    </section>

    {/* Posts Section */}
    <section className="space-y-4">
      <h3 className="text-xl font-semibold text-yellow-400">Posts</h3>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {cardData.map((card, index) => (
          <PostCard card={card} key={index} />
        ))}
      </div>
    </section>
    <CreateCommunity userId={session.user.id} />
  </main>
</div>
  );
}

export default Profile;
