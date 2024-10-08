// src/components/Navbar.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {

const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Samvidhan
            </Link>
          </div>

          {/* Links and Search Form */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/Chatbot" className="text-gray-700 hover:text-blue-600">
              Chatbot
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600">
              Blog
            </Link>
            <Link href="/news" className="text-gray-700 hover:text-blue-600">
              News
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            
            {/* Search Form */}
            <form className="ml-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </form>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-600">
            Home
          </Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-600">
            About
          </Link>
          <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-600">
            Blog
          </Link>
          <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-600">
            Contact
          </Link>
          <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-600">
            Login
          </Link>
          {/* Mobile Search Form */}
          <form className="px-3 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </form>
        </div>
      )}
    </nav>
  );
};

// const styles = {
//   nav: {
//     background: "#333",
//     padding: "1rem",
//     color: "#fff",
//   },
//   navList: {
//     display: "flex",
//     listStyle: "none",
//     gap: "1rem",
//     padding: 0,
//     margin: 0,
//   },
//   navLink: {
//     color: "#fff",
//     textDecoration: "none",
//   },
// };

export default Navbar;
