// src/components/Navbar.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBars } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); // Get session data
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // useEffect(() => {
  //   // Load Google Translate script once
  //   const addGoogleTranslateScript = () => {
  //     if (!window.google || !window.google.translate) {
  //       const script = document.createElement("script");
  //       script.type = "text/javascript";
  //       script.src =
  //         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //       document.body.appendChild(script);

  //       window.googleTranslateElementInit = () => {
  //         new window.google.translate.TranslateElement(
  //           { pageLanguage: "en" },
  //           "google_translate_element"
  //         );
  //       };
  //     }
  //   };

  //   addGoogleTranslateScript();
  // }, []);

  const handleTranslateClick = () => {
    setIsOpen((prev) => !prev);
  };
  
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    // Optionally, you could update the UI or add custom logic after logging out
  };

  const deafultProfilePhoto = "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" ; 
  
  return (
    <nav className="sticky left-0 right-0 top-0 z-50 bg-black border border-amber-200/30  transition duration-300">

      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">

          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-bold text-amber-400">
              Saral Samvidhan
            </Link>


          </div>

          {/* Links and Search Form */}

          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/" className="text-stone-50 hover:text-amber-600">
              HOME
            </Link>
            <Link href="/Chatbot" className="text-stone-50 hover:text-amber-600">
              CHATBOT
            </Link>
            <Link href="/discussionforum" className="text-stone-50 hover:text-amber-600">
              Discussion Forum
            </Link>
            <Link href="/news" className="text-stone-50 hover:text-amber-600">
              News
            </Link>
            <Link href="/game2" className="text-gray-50 hover:text-amber-600">
              Game
            </Link>
            <Link
              href="/lawchronicles"
              className="text-stone-50 hover:text-amber-600"
            >
              Law Chronicles
            </Link>
            {session ? (
            <div className="relative">
              {/* Profile photo */}
              <button onClick={toggleDropdown} className="flex items-center">
                <img
                  // src={session.user.image} // Assume `session.user.image` contains the profile photo URL
                  src={session.user.profilePhoto ===  deafultProfilePhoto ? deafultProfilePhoto: `/api/images/${session.user.profilePhoto}`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-stone-50"
                />
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-2 z-10">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-stone-50 hover:bg-gray-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  {session?.user?.role === 'admin' ? (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-stone-50 hover:bg-gray-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  ) : null}
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-stone-50 hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="text-stone-50 hover:text-amber-600">
              Login
            </Link>
          )}

          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <FaTimes className='m-2 h-6 w-5' /> : <FaBars className='m-2 h-6 w-5' />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-50  hover:bg-amber-600"
          >
            Home
          </Link>
          <Link
            href="/discussionforum"
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-50  hover:bg-amber-600"
          >
            Discussion Forum
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-50 hover:bg-amber-600"
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-50 hover:bg-amber-600"
          >
            Login
          </Link>
          <Link
            href="/profile"
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-50 hover:bg-amber-600"
          >
            Profile
          </Link>

        </div>
      )}

      {/* {isOpen && (
        
      )} */}
    </nav>
  );
};

export default Navbar;
