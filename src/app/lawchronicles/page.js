'use client'
import React, { useState, useEffect } from 'react';

const laws = [
  { name: 'Adoption and Maintenance Act', year: 1956, reference: 'https://www.indiacode.nic.in/bitstream/123456789/1638/1/AA1956____78.pdf' },
  { name: 'Air (Prevention and Control of Pollution) Act', year: 1981, reference: 'https://www.indiacode.nic.in/bitstream/123456789/9462/1/air_act-1981.pdf' },
  { name: 'Arbitration and Conciliation Act', year: 1996, reference: 'https://www.indiacode.nic.in/bitstream/123456789/1978/3/a1996-26.pdf' },
  { name: 'Arms Act', year: 1959, reference: 'https://www.indiacode.nic.in/bitstream/123456789/1398/1/A1959_54.pdf' },
  { name: 'Backward Classes (Reservation) Act', year: 1993, reference: 'https://en.wikipedia.org/wiki/Reservation_in_India#:~:text=Based%20on%20provisions%20in%20the,socially%20and%20economically%20backward%20citizens%22.' },
  { name: 'Child Labour (Prohibition and Regulation) Act', year: 1986, reference: 'https://example.com/child-labour' },
  { name: 'Constitution of India', year: 1950, reference: 'https://example.com/constitution' },
  { name: 'Bankruptcy Code', year: 2016, reference: 'https://www.mca.gov.in/Ministry/pdf/TheInsolvencyandBankruptcyofIndia.pdf' },
  { name: 'Companies Act', year: 2013, reference: 'https://example.com/companies' },
  { name: 'Consumer Protection Act', year: 2019, reference: 'https://example.com/consumer-protection' },
  { name: 'Constitution (73rd Amendment) Act', year: 1992, reference: 'https://example.com/73rd-amendment' },
  { name: 'Criminal Procedure Code (CrPC)', year: 1973, reference: 'https://example.com/crpc' },
  { name: 'Civil Procedure Code (CPC)', year: 1908, reference: 'https://example.com/cpc' },
  { name: 'Dowry Prohibition Act', year: 1961, reference: 'https://example.com/dowry-prohibition' },
  { name: 'Environment Protection Act', year: 1986, reference: 'https://example.com/environment' },
  { name: 'Factories Act', year: 1948, reference: 'https://example.com/factories' },
  { name: 'Hindu Marriage Act', year: 1955, reference: 'https://example.com/hindu-marriage' },
  { name: 'Indian Penal Code (IPC)', year: 1860, reference: 'https://example.com/ipc' },
  { name: 'Indian Evidence Act', year: 1872, reference: 'https://example.com/evidence' },
  { name: 'Information Technology Act', year: 2000, reference: 'https://example.com/it-act' },
  { name: 'Juvenile Justice Act', year: 2015, reference: 'https://example.com/juvenile-justice' },
  { name: 'Labor Laws (Various Acts)', year: 'Various', reference: 'https://example.com/labor-laws' },
  { name: 'Protection of Women from Domestic Violence Act', year: 2005, reference: 'https://example.com/domestic-violence' },
  { name: 'Public Liability Insurance Act', year: 1991, reference: 'https://example.com/public-liability' },
  { name: 'Right to Information Act', year: 2005, reference: 'https://example.com/rti' },
  { name: 'Wildlife Protection Act', year: 1972, reference: 'https://example.com/wildlife-protection' },
  { name: 'Workmen’s Compensation Act', year: 1923, reference: 'https://example.com/workmen-compensation' }
];

const AlphabeticalGlossary = () => {
  const [activeLetter, setActiveLetter] = useState('');

  // Group laws by starting letter
  const groupedLaws = laws.reduce((acc, law) => {
    const firstLetter = law.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(law);
    return acc;
  }, {});

  // Handle letter click - scroll to the section and update the active letter
  const handleLetterClick = (letter) => {
    setActiveLetter(letter);
    const element = document.getElementById(letter);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjust for fixed navbar height
        behavior: 'smooth',
      });
    }
  };

  // Scroll listener to update active letter based on the scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for fixed navbar
      let activeLetterInView = '';

      Object.keys(groupedLaws).forEach((letter) => {
        const section = document.getElementById(letter);
        if (section && section.offsetTop <= scrollPosition) {
          activeLetterInView = letter;
        }
      });

      if (activeLetterInView !== activeLetter) {
        setActiveLetter(activeLetterInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeLetter, groupedLaws]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Alphabetical index bar (horizontal) */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-amber-400 py-2   flex justify-center space-x-1 z-10 md:w-7/12 rounded-lg shadow-lg border border-amber-800">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
          <div
            key={letter}
            className={`  text-xl cursor-pointer ${activeLetter === letter ? 'font-bold text-blue-800 bg-amber-100' : 'text-gray-600'} hover:scale-110 py-1 px-2 rounded-md transition-all`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Glossary Table (scrollable content) */}
      <div className="flex-1 overflow-y-auto p-6 pt-24 bg-stone-100">
  <div className="flex flex-col min-h-screen p-6 bg-white rounded-lg shadow-lg">
    {/* Table Header */}
    <div className="flex bg-black text-amber-500 rounded-t-lg shadow-xl">
      <div className="flex-1 py-3 px-6 text-xl font-semibold">Act Name</div>
      <div className="flex-1 py-3 px-6 text-xl font-semibold">Year</div>
      <div className="flex-1 py-3 px-6 text-xl font-semibold">Learn More</div>
    </div>

    {/* Table Body */}
    <div className="flex flex-col">
      {Object.keys(groupedLaws).map((letter) => (
        <React.Fragment key={letter}>
          {/* Letter Header */}
          <div
            id={letter}
            className="flex  border-b bg-amber-200 text-black font-bold rounded-md text-2xl mt-4 w-16 border-l border-amber-500 shadow-lg"
          >
            <div className="flex-1 py-3 px-6">{letter}</div>
            <div className="flex-1 py-3 px-6"></div>
            <div className="flex-1 py-3 px-6"></div>
          </div>

          {/* Laws under this letter */}
          {groupedLaws[letter].map((law, index) => (
            <div
              key={index}
              className="flex border-b hover:bg-stone-200 transition-all duration-200 ease-in-out"
            >
              <div className="flex-1 py-3 px-6 text-black">{law.name}</div>
              <div className="flex-1 py-3 px-6 text-black">{law.year}</div>
              <div className="flex-1 py-3 px-6">
                <a
                  href={law.reference}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:underline font-bold"
                >
                  Learn More..
                </a>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
</div>



    </div>
  );
};

export default AlphabeticalGlossary;
