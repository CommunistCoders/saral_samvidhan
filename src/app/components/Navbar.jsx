// src/components/Navbar.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";  // Import useRouter
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBars } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import TranslateComponent from "./TranslateComponent";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); // Get session data
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();  // Use router to get current path 
  const [news, setNews] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  

  const handleTranslateClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    // Optionally, you could update the UI or add custom logic after logging out
  };

  const deafultProfilePhoto = "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg";

  const isActive = (path) => {
    // console.log("route : ",window.location.pathname);
    // return window.location.pathname === path ? " bg-amber-400 font-bold " : " hover:bg-amber-600 "; // Check if the link is active
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/news/headlines");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setNews(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black border border-amber-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 flex-row">
              <img src="/gavel.png" alt="Hammer" className="w-12 mr-2" />
              <Link href="/" className="text-3xl font-bold text-amber-400">
                Saral Samvidhan
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-4 items-center">
              <Link href="/" className={`px-4 py-2 text-stone-50 hover:text-amber-600 rounded-md ${isActive('/')}`}>
                Home
              </Link>
              <Link href="/Chatbot" className={`px-4 py-2 text-stone-50 hover:text-amber-600 rounded-md ${isActive('/Chatbot')}`}>
                Chatbot
              </Link>
              <Link href="/discussionforum" className={`px-4 py-2 text-stone-50 hover:text-amber-600 rounded-md ${isActive('/discussionforum')}`}>
                Discussion Forum
              </Link>
              <Link href="/news" className={`px-4 py-2 text-stone-50 hover:text-amber-600 rounded-md ${isActive('/news')}`}>
                News
              </Link>
              <Link href="/game2" className={`text-gray-50 hover:text-amber-600 ${isActive('/game2')}`}>
                Game
              </Link>
              <Link href="/lawchronicles" className={`px-4 py-2 text-stone-50 hover:text-amber-600 rounded-md ${isActive('/lawchronicles')}`}>
                Glossary
              </Link>

              {session ? (
                <div className="relative">
                  {/* Profile photo */}
                  <button onClick={toggleDropdown} className="flex items-center">
                    <img
                      src={session.user.profilePhoto === deafultProfilePhoto ? deafultProfilePhoto : `/api/images/${session.user.profilePhoto}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border border-stone-50"
                    />
                  </button>

                  {/* Dropdown menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-2 z-100">
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
                        className="block w-full text-left px-4 py-2 text-stone-50 hover:bg-amber-600 ${isActive('/')}"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className={`px-4 py-2 text-stone-50 rounded-md  ${isActive('/login')}`}>
                  Login
                </Link>
              )}
              {/* language translator */}
              <div className="  w-28 overflow-x-auto overflow-y-hidden h-11 rounded-lg "><TranslateComponent /></div>

            </div>

            {/* Hamburger Menu */}
            <div className="-mr-2 flex md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                {isOpen ? <FaTimes className="m-2 h-6 w-5" /> : <FaBars className="m-2 h-6 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-black border-l border-amber-200/30 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out z-50`}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl hover:text-amber-500 transition duration-200"
          >
            &times;
          </button>

          {/* Menu Links */}
          <div className="flex flex-col px-4 pt-12 space-y-2">
            <Link onClick={() => setIsOpen(false)} href="/" className={`block px-3 py-2 rounded-md text-base font-medium text-stone-50 hover:bg-amber-600 ${isActive('/')}`}>
              Home
            </Link>
            <Link
              onClick={() => setIsOpen(false)} 
              href="/Chatbot"
              className={`block px-3 py-2 rounded-md text-base font-medium text-stone-50 hover:bg-amber-600 ${isActive('/Chatbot')}`}
            >
              Chatbot
            </Link>
            <Link
              onClick={() => setIsOpen(false)} 
              href="/discussionforum"
              className={`block px-3 py-2 rounded-md text-base font-medium text-stone-50 hover:bg-amber-600 ${isActive('/discussionforum')}`}
            >
              Discussion Forum
            </Link>
            <Link onClick={() => setIsOpen(false)}  href="/news" className={`block px-3 py-2 rounded-md text-base font-medium text-stone-50 hover:bg-amber-600 ${isActive('/news')}`}>
              News
            </Link>
            <Link onClick={() => setIsOpen(false)}  href="/lawchronicles" className={`px-3 py-2 text-stone-50 hover:text-amber-600 rounded-md ${isActive('/lawchronicles')}`}>
              Glossary
            </Link>
            {/* language translator */}
            {/* <div className={`block px-3 py-2 rounded-md text-base font-medium text-stone-50 hover:bg-amber-600`}><TranslateComponent /></div> */}
            <Link onClick={() => setIsOpen(false)}  href="/profile" className={`block px-3 py-2 rounded-md text-base font-medium text-stone-50 hover:bg-amber-600 ${isActive('/profile')}`}>
              Profile
            </Link>          
            {session ? (
              <div className="relative">
                {/* Profile photo */}
                <button onClick={toggleDropdown} className="flex items-center px-3 py-2 ">
                  <img
                    src={session.user.profilePhoto === deafultProfilePhoto ? deafultProfilePhoto : `/api/images/${session.user.profilePhoto}`}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border border-stone-50 object-cover border-4 border-yellow-400 shadow-lg"
                  />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-2 z-100">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-stone-50 hover:bg-gray-600"
                      onClick={() => {
                        setDropdownOpen(false); // Close dropdown
                        setIsOpen(false);       // Close sidebar or other menu
                      }}
                    >
                      Profile
                    </Link>
                    {session?.user?.role === 'admin' ? (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-stone-50 hover:bg-gray-600"
                        onClick={() => {
                          setDropdownOpen(false);
                          setIsOpen(false);       // Close sidebar or other menu
                        }}
                      >
                        Admin Dashboard
                      </Link>
                    ) : null}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-stone-50 hover:bg-amber-600 ${isActive('/')}"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link onClick={() => setIsOpen(false)} href="/login" className={`px-4 py-2 text-stone-50 hover:text-amber-600 rounded-md ${isActive('/lawchronicles')}`}>
                Login
              </Link>
            )}

          </div>
        </div>
      </nav>

      {/* Flash News Section */}
      <section className="bg-sky-100 z-50 w-full py-4">
        <div className="container mx-auto overflow-hidden">
          <div className="ticker-wrapper">
            <div className="ticker-content">
              {news.map((item, index) => (
                <span key={item.title} className="ticker-item">
                  {item.publishedAt} : {item.title}
                  {index < news.length - 1 && <span>  |  </span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
