"use client";
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";

function Profile() {
  const { data: session, status } = useSession(); // Get session data and status
  const [photoUrl, setPhotoUrl] = useState("https://via.placeholder.com/150"); // Default placeholder URL
  const [newPhoto, setNewPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    if (session && session.user.profilePhoto !== photoUrl) {
      // Set the user's profile photo URL when session data is available
      setPhotoUrl(session.user.profilePhoto || "https://via.placeholder.com/150");
    }
  }, [session, photoUrl]); // Dependency array includes `photoUrl` to prevent infinite re-renders

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state until session is available
  }

  if (!session) {
    return <div>You need to be logged in</div>; // Handle case when there is no session
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
      // Send the new photo URL to the backend to update the user's profile
      const response = await fetch('/api/updateprofile', {
        method: 'POST',
        body: JSON.stringify({ profilePhoto: photoUrl }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Profile photo updated successfully');
        if (data && data.message) {
          console.log(data.message);
        } else {
          console.error("No message in response:", data);
        }
      } else {
        console.error("Error : ",data.message);
      }
    } catch (error) {
      console.error('Error updating profile photo:', error);
    }
  };
  return (
    <div className="min-h-screen bg-cover bg-center text-yellow-400" style={{ backgroundImage: "url('/bg1.jpg')" }}>
      {/* Header Section */}
      <header className="bg-black bg-opacity-80 p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <img
            src={photoUrl}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full border-4 border-yellow-400 shadow-lg"
          />
        </div>
        
        {/* Profile Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">{session.user.username}</h2>
          <p className="text-gray-300 text-sm sm:text-lg">{session.user.email}</p>
          <p className="text-gray-300">Language Preference: <span className="text-yellow-400">{session.user.languagePreference}</span></p>
          
          {/* Upload Photo Section */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="mt-4"
          />
          <button
            onClick={handleUpload}
            disabled={isUploading || !newPhoto}
            className={`mt-2 bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 ${isUploading ? 'cursor-not-allowed' : ''}`}
          >
            {isUploading ? 'Uploading...' : 'Upload Photo'}
          </button>

          {/* Show confirmation message after upload */}
          {uploadSuccess && !isUploading && (
            <p className="text-green-500 mt-2">Photo uploaded successfully!</p>
          )}

          {/* Confirm Photo Button */}
          {!isUploading && uploadSuccess && (
            <button
              onClick={handleConfirmPhoto}
              className="mt-4 bg-green-600 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-md hover:bg-green-700 transition duration-300"
            >
              Confirm Photo
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={() => signOut()}
            className="mt-4 bg-red-600 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto mt-6 md:mt-8 p-4 sm:p-6 space-y-6 sm:space-y-8 bg-black bg-opacity-75 rounded-lg shadow-lg">
        {/* About Me Section */}
        <section className="text-base sm:text-lg text-gray-300 space-y-2 sm:space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400">About Me</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
          </p>
        </section>

        {/* Tags Section */}
        <section className="text-base sm:text-lg text-gray-300 space-y-2 sm:space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400">Tags</h3>
          {/* <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              { title: "Understanding React Hooks", date: "Sep 25, 2024" },
              { title: "Node.js vs. Django: Which is Better?", date: "Oct 3, 2024" },
              { title: "Introduction to Web Accessibility", date: "Oct 10, 2024" },
            ].map(tag => (
              <span key={tag} className="bg-yellow-400 text-black py-1 px-3 rounded-full text-xs sm:text-sm font-semibold">
                {tag}
              </span>
            ))}
          </div> */}
        </section>

        {/* Communities Joined Section */}
        <section className="text-base sm:text-lg text-gray-300 space-y-2 sm:space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400">Communities Joined</h3>
          <ul className="list-disc list-inside space-y-1">
            {['React Developers', 'Open Source Contributors', 'Web Dev Enthusiasts', 'Full Stack Developers'].map(community => (
              <li key={community} className="text-gray-300">{community}</li>
            ))}
          </ul>
        </section>

        {/* Posts Section */}
        <section className="text-base sm:text-lg text-gray-300 space-y-2 sm:space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400">My Posts</h3>
          <div className="space-y-4">
            {[
              { title: "Understanding React Hooks", date: "Sep 25, 2024" },
              { title: "Node.js vs. Django: Which is Better?", date: "Oct 3, 2024" },
              { title: "Introduction to Web Accessibility", date: "Oct 10, 2024" },
            ].map(post => (
              <div key={post.title} className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md">
                <h4 className="text-yellow-400 font-semibold text-base sm:text-lg">{post.title}</h4>
                <p className="text-xs sm:text-sm text-gray-400">{post.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Edit Profile Button */}
        <button className="mt-4 bg-yellow-400 text-black py-2 px-6 rounded-md font-semibold hover:bg-yellow-500 transition duration-300">
          Edit Profile
        </button>
      </main>
    </div>
  );
}

export default Profile;
