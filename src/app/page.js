"use client";
import React from "react";
import Image from "next/image";
import { FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";
import HorizontalPostcards from "./components/HorizontalPostcards";

const quotes = [
  { text: "The law is reason, free from passion.", author: "– Aristotle" },
  { text: "Injustice anywhere is a threat to justice everywhere.", author: "– Martin Luther King Jr." },
  { text: "The only thing we have to fear is fear itself.", author: "– Franklin D. Roosevelt" },
  { text: "That which does not kill us makes us stronger.", author: "– Friedrich Nietzsche" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "– Franklin D. Roosevelt" },
];

const HomePage = () => {
  return (
    <div>
    <section className="relative w-full h-screen overflow-hidden">
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
            className="relative mt-60 p-8 mx-4 md:mx-0 bg-white bg-opacity-10 backdrop-blur rounded-lg shadow-lg border border-amber-400/30"
            initial={{ x: -100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8 }}
          >
            <blockquote className="text-xl italic font-semibold text-stone-50">
              <FaQuoteRight className="h-6 w-6 inline-block text-amber-500 mr-2" />
              <p>"The law is reason, free from passion.” – Aristotle.</p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
      <HorizontalPostcards />
      </div>
  );
};

export default HomePage;
