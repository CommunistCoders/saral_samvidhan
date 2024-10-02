// src/app/page.js
import React from "react";
import Navbar from "@/components/NavBar";

const HomePage = () => {
  return (
    <main>
      
      
      <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to  Saral Samvidhan Law Services
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Dedicated to providing legal expertise in constitutional law and justice.
          </p>
          {/* <Link href="/h">
            <a className="mt-8 inline-block bg-yellow-500 text-blue-900 font-semibold px-6 py-3 rounded-full transition duration-300 hover:bg-yellow-600">
              Contact Us
            </a>
          </Link> */}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Constitutional Law</h3>
              <p className="text-gray-700">
                Expertise in constitutional law, providing in-depth understanding of the Samvidhan and its interpretation.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Criminal Law</h3>
              <p className="text-gray-700">
                We offer criminal defense services, ensuring your rights are protected throughout the judicial process.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Civil Rights</h3>
              <p className="text-gray-700">
                Protecting civil rights through advocacy, representation, and legal action in defense of justice.
              </p>
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
          {/* <Link href="/learn-more">
            <a className="mt-8 inline-block bg-blue-900 text-white font-semibold px-6 py-3 rounded-full transition duration-300 hover:bg-blue-800">
              Learn More
            </a>
          </Link> */}
        </div>
      </section>
    </div>
    </main>
  );
};


export default HomePage;
