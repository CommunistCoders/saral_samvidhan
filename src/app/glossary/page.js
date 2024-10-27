"use client";
import React, { useState } from "react";

const initialGlossaryTerms = [
  {
    term: "Constitutional Law",
    definition:
      "The body of law that defines the role, powers, and structure of different entities within a state, namely the executive, the legislature, and the judiciary, as well as the basic rights of citizens."
  },
  {
    term: "Civil Rights",
    definition:
      "Rights that guarantee individuals freedom and equality under the law. These include freedom of speech, the right to vote, freedom from discrimination, and the right to due process."
  },
  {
    term: "Criminal Law",
    definition:
      "The body of law that pertains to crime and punishment. It includes statutes that define offenses and prescribe penalties, ensuring justice for criminal acts."
  },
  {
    term: "Judicial Review",
    definition:
      "The process by which courts interpret the constitutionality of laws or government actions. It allows courts to strike down laws that violate constitutional principles."
  },
  {
    term: "Plaintiff",
    definition:
      "The individual or party who initiates a lawsuit in a civil court by filing a complaint against the defendant, seeking legal remedies."
  },
  {
    term: "Defendant",
    definition:
      "The person, group, or entity against whom a lawsuit is filed or who is charged with a crime in court."
  },
  {
    term: "Precedent",
    definition:
      "A legal decision made in earlier cases that sets a standard for how similar cases should be decided in the future, ensuring consistency in law."
  },
  {
    term: "Habeas Corpus",
    definition:
      "A legal principle that protects individuals from unlawful detention without being charged. It requires a person under arrest to be brought before a court."
  }
];

export default function GlossaryPage() {
  const [openIndex, setOpenIndex] = useState(null); // Track which term is currently open

  const handleTermClick = (index) => {
    // Toggle the currently open term
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-6 py-5">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-900">
        Legal Glossary
      </h2>


       {/* Search Section */}
       <section className="py-5">
          <div className="container mx-auto px-6 text-center">
            <input
              type="text"
              placeholder="Search for legal terms..."
              className="border border-gray-300 p-2 rounded-md w-1/2"
            />
          </div>
        </section>

      <div className=" container flex justify-center">
        <ul className="terms-list space-y-3 max-w-lg w-full">
          {initialGlossaryTerms.map((item, index) => (
            <li key={index}>
              <div
                className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-black font-semibold py-3 px-4 rounded-md shadow-lg"
                onClick={() => handleTermClick(index)}
              >
                <span className="font-bold">{index + 1}. </span>
                <span>{item.term}</span>
              </div>

              {/* Display Selected Term Details Below the Term */}
              {openIndex === index && (
                <div className="term-details p-6 bg-blue-900 text-white rounded-md shadow-lg mb-4">
                  <h3 className="text-3xl font-bold mb-4 text-yellow-300">
                    {index + 1}. {item.term}
                  </h3>
                  <p className="text-lg leading-relaxed">{item.definition}</p>
                </div>
              )}
            </li>
          ))}
        </ul>


        
      </div>


      
      
      
    </div>
  );
}
