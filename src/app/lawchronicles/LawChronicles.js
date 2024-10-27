'use client'
import React, { useState } from 'react';
import './LawChronicles.css';
// import Navbar from './Navbar'; // Import the Navbar component


const LawChronicles = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [viewedHistory, setViewedHistory] = useState([]);
  
  // Array of cases
  const cases = [
    { title: "Theft Case", description: "Details of a theft case involving stolen goods." },
    { title: "Property Dispute", description: "Case study of a family property dispute." },
    { title: "Employee Rights", description: "A case about unfair dismissal in the workplace." },
    { title: "Patent Violation", description: "Exploration of a case involving a patent infringement." },
    { title: "Domestic Issue", description: "Details of a domestic violence case handled in court." },
    { title: "Tax Evasion", description: "A case of corporate tax evasion and subsequent legal action." },
    { title: "Breach of Contract", description: "Business dispute due to a breach of contract terms." },
    { title: "Cyber Fraud", description: "A case study of online financial fraud and justice served." },
    { title: "Environmental Law", description: "Legal battle over environmental violations." },
    { title: "Public Nuisance", description: "Case about a public nuisance lawsuit in an urban area." },
  ];

  const tags = [" * Crime Case", " * Civil Case", " * Family Law", " * Employment Law", " * Intellectual Law", " * Other"];

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setViewedHistory([...viewedHistory, { title: tag, description: `Recently viewed case in ${tag}` }]);
  };

  return (
    <div className="law-chronicles-container">
      {/* Left Sidebar with Tags */}

      <div className="sidebar">
        <h3>Case Type</h3>
        <ul>
          {tags.map((tag, index) => (
            <li key={index} onClick={() => handleTagClick(tag)} className={tag === selectedTag ? 'active' : ''}>
              {tag}
            </li>
          ))}
        </ul>
      </div>



      {/* Main Content with Case Cards */}
      <div className="main-content">
        <div className="card-grid">
          {cases.map((caseItem, index) => (
            <div key={index} className="case-card">
              <h2>{caseItem.title}</h2>
              <p>{caseItem.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar with Viewed History */}
      <div className="sidebar">
        <h3>Recently Viewed</h3>
        <ul>
          {viewedHistory.map((history, index) => (
            <li key={index}>
              <strong>{history.title}</strong>
              <p>{history.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>  
  );
};

export default LawChronicles;
