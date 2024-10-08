"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import { CSSTransition } from 'react-transition-group';
import './formStyles.css'; // Import custom CSS for transitions

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
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
                className={isLogin ? 'active' : ''}
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsLogin(true)}
              >
                Login
              </motion.button>
              <motion.button
                className={!isLogin ? 'active' : ''}
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
                <motion.form className="login-form">
                  <div className="field">
                    <input type="email" required />
                    <label>Email Address</label>
                  </div>
                  <div className="field">
                    <input type="password" required />
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
                <motion.form className="signup-form">
                  <div className="field">
                    <input type="email" required />
                    <label>Email Address</label>
                  </div>
                  <div className="field">
                    <input type="password" required />
                    <label>Password</label>
                  </div>
                  <div className="field">
                    <input type="password" required />
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
      {/* <footer className="footer">
        <p>© 2024  Copyright IIT Tirupati. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Page;
