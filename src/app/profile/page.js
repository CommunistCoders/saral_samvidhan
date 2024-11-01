"use client";

import React, { useState, useEffect } from "react";
import "./profileStyles.css"; // Import your styles

const Profile = () => {
  // const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if the user is logged in by checking localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, redirect to login page
      //   navigate("/login");
    } else {
      // Get username and email from localStorage
      const storedUserName = localStorage.getItem("userName");
      const storedEmail = localStorage.getItem("email");
      setUserName(storedUserName || "Guest"); // Default to 'Guest' if not found
      setEmail(storedEmail || "Not provided"); // Default message if email not found
    }
  }, []); // Adding navigate as a dependency

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    localStorage.removeItem("userName"); // Clear username
    localStorage.removeItem("email"); // Clear email
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p>
          <strong>Username:</strong> {userName}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
