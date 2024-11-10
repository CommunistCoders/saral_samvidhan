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
        date: "October 7, 2024",
      },
      {
        id: 2,
        title: "Supreme Court Ruling on Civil Rights",
        date: "October 1, 2024",
      },
      {
        id: 3,
        title: "Criminal Law Reform Announced",
        date: "September 25, 2024",
      },
    ];

    setNews(fetchedNews);
  }, []);
  return (
    <div>
    {/* Flash News Section */}
    <section className="bg-sky-100 z-50 fixed w-full py-4">
      <div className="container mx-auto overflow-hidden">
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {news.map((item, index) => (
              <span key={item.id} className="ticker-item">
                {item.date}: {item.title}
                {index < news.length - 1 && <span> | </span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
      <section className="relative w-full h-screen ">
        <Image
          src="/bg1.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex flex-col justify-center items-center">
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
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Understanding Your Rights</h3>
              <p className="text-gray-700">An overview of your constitutional rights under Indian law.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">The Role of the Supreme Court</h3>
              <p className="text-gray-700">Insights into the Supreme Court's function in upholding justice.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Navigating Criminal Charges</h3>
              <p className="text-gray-700">Key steps to take if you are facing criminal charges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Testimonials Slider */}
      <section className="bg-gray-200 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
          <div className="carousel">
            <div className="carousel-item">
              <blockquote className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-lg">"Saral Samvidhan provided me with excellent legal support. Highly recommend!"</p>
                <footer className="mt-4 font-bold">- Client A</footer>
              </blockquote>
            </div>
            <div className="carousel-item">
              <blockquote className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-lg">"Their expertise in constitutional law helped me understand my rights better."</p>
                <footer className="mt-4 font-bold">- Client B</footer>
              </blockquote>
            </div>
            {/* Add more testimonials here */}
          </div>
        </div>
      </section>

      


      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">Stay Updated with Our Newsletter</h2>
          <p className="text-lg text-gray-600 mb-8">Get the latest legal insights, tips, and news directly to your inbox.</p>
          
          <div className="flex justify-center items-center space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border-2 border-gray-300 rounded-md p-3 w-2/5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300">
              Subscribe
            </button>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </section>

  </div>
  );
};

export default HomePage;
