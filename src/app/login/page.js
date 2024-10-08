"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
// import { CSSTransition } from 'react-transition-group';
import "./formStyles.css"; // Import custom CSS for transitions

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const credential = {
      username: userName,
      password: password,
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        // Replace with your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(credential), // Convert the data to JSON
      });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      const data = await response.json(); // Parse the JSON response

      alert(`${data.message}`);

      // Handle successful login (e.g., redirect, show a message, etc.)
    } catch (error) {
      alert(`Error: ${error}`); // Handle errors (e.g., show an error message)
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (newPassword != confirmPassword) {
      alert("Passwords Don't match");
      return;
    }
    const credential = {
      username: email,
      password: newPassword,
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        // Replace with your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(credential), // Convert the data to JSON
      });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      const data = await response.json(); // Parse the JSON response
      alert(`${data.message}`);

      // Handle successful login (e.g., redirect, show a message, etc.)
    } catch (error) {
      alert(`Error: ${error}`); // Handle errors (e.g., show an error message)
    }
  };

  return (
    <div className="page-container">
      {/* Navbar */}

      {/* Main Content */}
      <main className="main-content">
        <div className="form-wrapper">
          <div className="form-container">
            {/* Toggle Buttons */}
            <div className="toggle-buttons">
              <motion.button
                className={isLogin ? "active" : ""}
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsLogin(true)}
              >
                Login
              </motion.button>
              <motion.button
                className={!isLogin ? "active" : ""}
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsLogin(false)}
              >
                Signup
              </motion.button>
            </div>

            {/* Form Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="form-content"
            >
              {isLogin ? (
                <motion.form className="login-form" onSubmit={handleLogin}>
                  <div className="field">
                    <input
                      type="email"
                      required
                      id="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <label>Email Address</label>
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      required
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                  </div>
                  <motion.button
                    type="submit"
                    className="submit-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form className="signup-form" onSubmit={handleRegister}>
                  <div className="field">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <label>Email Address</label>
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                    <label>Password</label>
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    <label>Confirm Password</label>
                  </div>
                  <motion.button
                    type="submit"
                    className="submit-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Signup
                  </motion.button>
                </motion.form>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Copyright IIT Tirupati. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
