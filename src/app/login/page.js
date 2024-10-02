"use client";
import React, { useState } from 'react'
import Link from 'next/link';
import SignUp from '../signup/signUp';



const page = () => {

    const [email,setEmail] = useState('');
    const [Password,setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ email, Password });
      };
      
  return (
    <>
    

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
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

          <div className="mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-neutral-800 hover:bg-neutral-700 hover:shadow-light-2 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:bg-neutral-200 focus:ring-opacity-50 transition duration-300"
            >
              Login
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signUp" className="text-indigo-500 hover:text-indigo-600" >
                signUp
              </Link>
              {/* <button className="text-indigo-500 hover:text-indigo-600" onClick={handleSignUp}>signUp</button> */}
            </p>
          </div>
        </form>
      </div>
    </div>


    </>
  );
}

export default page