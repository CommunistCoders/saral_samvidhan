'use client'
import React, { useState } from 'react';
import './LawChronicles.css';

const LawChronicles = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [viewedHistory, setViewedHistory] = useState([]);
  
  // Array of cases with random stories
  const cases = [
    { 
      title: "Theft Case", 
      description: "A notorious thief was caught red-handed stealing valuable items from a high-end jewelry store. Despite initial denials, surveillance footage revealed his identity, leading to a swift trial and conviction." 
    },
    { 
      title: "Property Dispute", 
      description: "A bitter legal battle between two brothers over the ownership of an inherited estate. One brother claimed he was promised the house, while the other argued the will was forged." 
    },
    { 
      title: "Employee Rights", 
      description: "An employee filed a case against her employer for wrongful termination after she was let go without notice for raising concerns about workplace harassment. The court ruled in her favor, granting her compensation." 
    },
    { 
      title: "Patent Violation", 
      description: "A tech company was accused of infringing on a competitor's patent. The case hinged on whether the company's product design was too similar to the patented technology. After extensive legal battles, the company had to pay royalties for using the patented design." 
    },
    { 
      title: "Domestic Issue", 
      description: "A woman filed a case against her abusive partner, seeking restraining orders and custody of their children. The case highlighted the prevalence of domestic violence in the community and was widely reported in the media." 
    },
    { 
      title: "Tax Evasion", 
      description: "A well-known corporation was investigated for tax evasion after investigators uncovered fraudulent financial statements. The company was found guilty and fined millions, with several executives facing prison time for their involvement." 
    },
    { 
      title: "Breach of Contract", 
      description: "A startup sued a major supplier for failing to deliver materials on time, which caused a delay in product launch. The court ruled in favor of the startup, and the supplier was ordered to pay damages." 
    },
    { 
      title: "Cyber Fraud", 
      description: "A cybercriminal ring was exposed after a series of online financial scams targeting unsuspecting investors. The perpetrators were arrested, and the victims were compensated for their losses." 
    },
    { 
      title: "Environmental Law", 
      description: "An environmental nonprofit filed a lawsuit against a factory for illegally dumping waste into a nearby river. The case brought attention to the factory's illegal practices, and the company was forced to pay heavy fines and invest in cleaner technologies." 
    },
    { 
      title: "Public Nuisance", 
      description: "A local community group sued a nightclub for causing excessive noise and disrupting the neighborhood. The court ruled that the nightclub was violating public nuisance laws and ordered them to reduce their operating hours." 
    }
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
