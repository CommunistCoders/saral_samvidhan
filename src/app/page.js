// src/app/page.js
"use client";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [news, setNews] = useState([]);

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
    <main>
      <section className="bg-sky-100 py-4">
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

      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <section className="bg-blue-900 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">
              Welcome to Saral Samvidhan Law Services
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Dedicated to providing legal expertise in constitutional law and justice.
            </p>
          </div>
        </section>

       


        <section className="bg-yellow-300 py-12">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-4">Get the latest updates and legal tips delivered to your inbox.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 p-2 rounded-md w-1/3"
            />
            <button className="ml-4 bg-blue-900 text-white py-2 px-4 rounded-md">Subscribe</button>
          </div>
        </section>

        {/* Featured Articles/News Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Recent Articles</h2>
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

        

        

        {/* Interactive Legal Resources Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Legal Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Downloadable Guide</h3>
                <p className="text-gray-700">Get our free guide on understanding your legal rights.</p>
                <a href="/guide" className="text-blue-600">Download Now</a>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Legal Checklist</h3>
                <p className="text-gray-700">Check your legal rights with our interactive checklist.</p>
                <a href="/checklist" className="text-blue-600">Access Checklist</a>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">FAQs</h3>
                <p className="text-gray-700">Find answers to common legal questions.</p>
                <a href="/faqs" className="text-blue-600">Learn More</a>
              </div>
            </div>
          </div>
        </section>

        

        {/* FAQs Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="font-bold">What is constitutional law?</h3>
                <p className="text-gray-700">Constitutional law deals with the interpretation and implementation of the constitution.</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="font-bold">How can I contact you?</h3>
                <p className="text-gray-700">You can reach us through our contact page for any inquiries.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-yellow-500 text-blue-900 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold">
              Learn more about the Indian Constitution (Samvidhan)
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Understand your rights and responsibilities under the law.
            </p>
            <a href="/contact" className="mt-4 inline-block bg-blue-900 text-white py-2 px-4 rounded-md">
              Contact Us
            </a>
          </div>
        </section>

      </div>

      {/* Styles */}
      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          box-sizing: border-box;
        }

        .ticker-content {
          display: inline-block;
          white-space: nowrap;
          animation: ticker 15s linear infinite;
        }

        .ticker-item {
          display: inline-block;
          padding: 0 2rem;
          font-size: 1.1rem;
          color: #1e3a8a;
        }

        @keyframes ticker {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        /* Carousel Styles */
        .carousel {
          display: flex;
          overflow: hidden;
          position: relative;
        }

        .carousel-item {
          min-width: 100%;
          transition: transform 0.5s ease;
        }
      `}</style>
    </main>
  );
};

export default HomePage;
