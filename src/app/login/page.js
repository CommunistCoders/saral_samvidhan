"use client";
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './formStyles.css'; // Import custom CSS for transitions

const Page = () => {
  // State for toggling between login and signup forms
  const [isLogin, setIsLogin] = useState(true);

  // State for login form fields
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  // State for signup form fields
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log({ email, Password });
  };

  // Handle signup form submission
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log({ signUpName, signUpEmail, signUpPassword });
  };

  // Toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="relative w-full max-w-2xl bg-white p-8 shadow-md rounded-lg transition-all duration-500">
          <div className="flex flex-row space-x-8 relative">
            {/* Login Form */}
            <CSSTransition
              in={isLogin}
              // timeout={500}
              classNames="form"
              unmountOnExit
            >
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="mb-4">
                    <button
                      type="submit"
                      className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition duration-300"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </CSSTransition>

            {/* Signup Form */}
            <CSSTransition
              in={!isLogin}
              // timeout={500}
              classNames="form"
              unmountOnExit
            >
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSignUpSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email-signup">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email-signup"
                      name="email-signup"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-signup">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password-signup"
                      name="password-signup"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="mb-4">
                    <button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </CSSTransition>
          </div>

          {/* OR Separator with switch button */}
          <div className="text-center mt-4">
            <span className="text-gray-600">OR</span>
            <div className="mt-4">
              <button
                onClick={toggleForm}
                className="text-indigo-500 hover:text-indigo-600 transition duration-300"
              >
                {isLogin ? 'Create an account' : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
