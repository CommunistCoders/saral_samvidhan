"use client";
import React from "react";
import Image from "next/image";
import { FaQuoteRight } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import HorizontalPostcards from "./components/HorizontalPostcards";

const quotes = [
  { text: "The law is reason, free from passion.", author: "– Aristotle" },
  { text: "Injustice anywhere is a threat to justice everywhere.", author: "– Martin Luther King Jr." },
  { text: "The only thing we have to fear is fear itself.", author: "– Franklin D. Roosevelt" },
  { text: "That which does not kill us makes us stronger.", author: "– Friedrich Nietzsche" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "– Franklin D. Roosevelt" },
];
const articles = [
  { article: "Article 1: Name and territory of the Union" },
  { article: "Article 2: Admission or establishment of new States" },
  { article: "Article 3: Formation of new States and alterations of areas, boundaries or names of existing States" },
  // Add more articles here
];

const HomePage = () => {
  const [quote, setQuote] = useState(null);  
  const [news, setNews] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubscribe = () => {
    setIsSubscribed(true); // Update state to show the thank-you message
    setTimeout(() => setIsSubscribed(false), 3000); // Optionally, hide the message after 3 seconds
  };


  // Function to get a random quote
  const getRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };
  
  useEffect(() => {
    // Set the initial quote
    getRandomQuote();

    // Set an interval to update the quote every 5 seconds
    const intervalId = setInterval(() => {
      setTimeout(() => {
        getRandomQuote(); // Change the quote after fade-out ends
      }, 500); // Wait for 500ms before updating the quote
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Example useEffect to simulate fetching news from an API
  useEffect(() => {
    const fetchedNews = [
      
      {
        id: 1,
        title: "New Constitutional Amendment Passed",
        date: "November 15, 2024",
      },
      {
        id: 2,
        title: "Supreme Court Ruling on Civil Rights",
        date: "November 15, 2024",
      },
      {
        id: 3,
        title: "Criminal Law Reform Announced",
        date: "November 15, 2024",
      },
    ];

    setNews(fetchedNews);
  }, []);
  return (
    <div>
      <section className="relative w-full h-screen ">
        <Image
          src="/bg1.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />



        <div className="absolute inset-0 bg-black bg-opacity-50  flex flex-col justify-center items-center">
          <div className="my-10 text-white container mx-auto z-20 text-center">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold"
            >
              <p>Welcome To</p>
              <p className="text-amber-300">Saral Samvidhan</p>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-5 text-lg md:text-xl max-w-prose mx-auto"
            >
              Dedicated to providing legal expertise in constitutional law and justice.
            </motion.p>
          </div>

          <div className="container flex justify-center">
            <motion.div
              className="relative  p-8 mx-4 md:mx-0 bg-white bg-opacity-10 backdrop-blur rounded-lg shadow-lg border border-amber-400/30"
              initial={{ x: -100, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ duration: 0.8 }}
            >
            {quote ? (
              <blockquote className="text-xl italic font-semibold text-stone-50 quote-text">
                <FaQuoteRight className="h-6 w-6 inline-block text-amber-500 mr-2" />
                <p>{quote.text} {quote.author}</p>
              </blockquote>
            ) : (
              <p>Loading...</p> // Show a loading state while the quote is being selected
            )}
            </motion.div>
          </div>
        </div>
      </section>


      {/* Posts Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Recent Articles</h2>
          <HorizontalPostcards />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-amber-100 shadow-xl rounded-xl  p-6">
              <h3 className="text-2xl font-bold mb-4">Understanding Your Rights</h3>
              <p className="text-amber-950">An overview of your constitutional rights under Indian law.</p>
            </div>
            <div className="bg-amber-100 shadow-lg rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">The Role of the Supreme Court</h3>
              <p className="text-amber-950">Insights into the Supreme Court's function in upholding justice.</p>
            </div>
            <div className="bg-amber-100 shadow-lg rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">Navigating Criminal Charges</h3>
              <p className="text-amber-950">Key steps to take if you are facing criminal charges.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Stay Updated with Our Newsletter
        </h2>
        <p className="text-lg text-amber-800 mb-8">
          Get the latest legal insights, tips, and news directly to your inbox.
        </p>

        {/* Subscription Form */}
        <div className="flex justify-center items-center space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border-2 border-amber-100 rounded-md p-3 w-2/5 focus:outline-none focus:ring-2 focus:ring-amber-950 transition duration-300"
            disabled={isSubscribed} // Disable input when subscribed
          />
          <button
            onClick={handleSubscribe}
            className={`bg-amber-700 hover:bg-amber-800 text-white py-3 px-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 ${
              isSubscribed ? 'cursor-not-allowed' : ''
            }`}
            disabled={isSubscribed} // Disable button when subscribed
          >
            {isSubscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </div>

        {/* Thank You Message */}
        {isSubscribed && (
          <p className="mt-6 text-lg text-green-600 font-semibold">
            Thanks for subscribing!
          </p>
        )}

        <p className="mt-6 text-sm text-amber-800">
          We respect your privacy and will never share your information.
        </p>
      </div>
    </section>
      
  </div>
  );
};

export default HomePage;
