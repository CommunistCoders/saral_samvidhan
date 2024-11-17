"use client";
import React, { useState, useEffect } from 'react';
import { IoSearch, IoMail } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { TbCircleArrowUpRight } from "react-icons/tb";
import { RiArrowDownWideFill } from "react-icons/ri";
import NewPost from '../components/NewPost';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import Link from "next/link";

const Page = () => {
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [visibleCommunities, setVisibleCommunities] = useState(3);
  const [showNewPost, setShowNewPost] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [communities,setCommunityData] = useState([]);
  const [isVertical, setIsVertical] = useState(true); // Toggle between vertical and horizontal layout


  // const communities = [
  //   {
  //     id: 1,
  //     name: 'Constitutional Law',
  //     description: 'Discussions on fundamental rights, amendments, and constitutional interpretation.',
  //     memberCount: 105000,
  //     avatarUrl: '/path/to/image1.jpg',
  //     tags: ['Fundamental Rights', 'Amendments', 'Judicial Review', 'Bill of Rights', 'Separation of Powers']
  //   },
  //   {
  //     id: 2,
  //     name: 'Criminal Law',
  //     description: 'Topics on criminal justice, cases, reforms, and legal precedents.',
  //     memberCount: 89000,
  //     avatarUrl: '/path/to/image2.jpg',
  //     tags: ['Criminal Justice', 'Reform', 'Legal Precedents', 'Case Studies', 'Criminal Procedure']
  //   },
  //   {
  //     id: 3,
  //     name: 'Civil Rights and Liberties',
  //     description: 'Discussions on human rights, discrimination cases, and civil liberties.',
  //     memberCount: 68000,
  //     avatarUrl: '/path/to/image3.jpg',
  //     tags: ['Human Rights', 'Discrimination', 'Freedom of Speech', 'Civil Liberties', 'Equality']
  //   },
  //   {
  //     id: 4,
  //     name: 'Family Law',
  //     description: 'A community for issues around marriage, divorce, custody, and related rights.',
  //     memberCount: 45000,
  //     avatarUrl: '/path/to/image4.jpg',
  //     tags: ['Marriage', 'Divorce', 'Custody', 'Adoption', 'Child Support']
  //   },
  //   {
  //     id: 5,
  //     name: 'Corporate and Business Law',
  //     description: 'For discussions on corporate governance, mergers, and international business law.',
  //     memberCount: 74000,
  //     avatarUrl: '/path/to/image5.jpg',
  //     tags: ['Corporate Governance', 'Mergers', 'Acquisitions', 'International Business', 'Compliance']
  //   },
  //   {
  //     id: 6,
  //     name: 'Environmental Law',
  //     description: 'Focus on laws related to environmental protection, sustainability, and climate change.',
  //     memberCount: 53000,
  //     avatarUrl: '/path/to/image6.jpg',
  //     tags: ['Climate Change', 'Sustainability', 'Environmental Protection', 'Pollution', 'Wildlife Law']
  //   },
  //   {
  //     id: 7,
  //     name: 'Intellectual Property Law',
  //     description: 'Topics around copyrights, patents, trademarks, and related cases.',
  //     memberCount: 59000,
  //     avatarUrl: '/path/to/image7.jpg',
  //     tags: ['Copyrights', 'Patents', 'Trademarks', 'Infringement', 'Intellectual Property']
  //   },
  //   {
  //     id: 8,
  //     name: 'Employment and Labor Law',
  //     description: 'Discussions on labor rights, employment disputes, and workplace regulations.',
  //     memberCount: 48000,
  //     avatarUrl: '/path/to/image8.jpg',
  //     tags: ['Labor Rights', 'Employment Disputes', 'Workplace Regulations', 'Unions', 'Wages']
  //   },
  //   {
  //     id: 9,
  //     name: 'Immigration Law',
  //     description: 'Focus on policies, visa issues, and international immigration cases.',
  //     memberCount: 52000,
  //     avatarUrl: '/path/to/image9.jpg',
  //     tags: ['Visas', 'Asylum', 'Deportation', 'Immigration Policies', 'Citizenship']
  //   },
  //   {
  //     id: 10,
  //     name: 'Tax Law',
  //     description: 'Discussions on tax regulations, reform, and compliance strategies.',
  //     memberCount: 36000,
  //     avatarUrl: '/path/to/image10.jpg',
  //     tags: ['Tax Regulations', 'Tax Reform', 'Compliance', 'Income Tax', 'Corporate Tax']
  //   },
  //   {
  //     id: 11,
  //     name: 'Property and Real Estate Law',
  //     description: 'Topics on land rights, real estate transactions, and property disputes.',
  //     memberCount: 42000,
  //     avatarUrl: '/path/to/image11.jpg',
  //     tags: ['Land Rights', 'Real Estate Transactions', 'Property Disputes', 'Mortgages', 'Land Use']
  //   },
  //   {
  //     id: 12,
  //     name: 'Cyber and Privacy Law',
  //     description: 'Focus on data protection, cybersecurity, and digital privacy issues.',
  //     memberCount: 49000,
  //     avatarUrl: '/path/to/image12.jpg',
  //     tags: ['Data Protection', 'Cybersecurity', 'Privacy', 'Internet Law', 'Data Breaches']
  //   },
  //   {
  //     id: 13,
  //     name: 'Health Law and Bioethics',
  //     description: 'For discussions on healthcare policy, bioethics, and patient rights.',
  //     memberCount: 37000,
  //     avatarUrl: '/path/to/image13.jpg',
  //     tags: ['Healthcare Policy', 'Bioethics', 'Patient Rights', 'Medical Malpractice', 'Healthcare Access']
  //   },
  //   {
  //     id: 14,
  //     name: 'International Law',
  //     description: 'A community for topics on international treaties, war crimes, and global justice.',
  //     memberCount: 64000,
  //     avatarUrl: '/path/to/image14.jpg',
  //     tags: ['International Treaties', 'War Crimes', 'Global Justice', 'Diplomacy', 'International Courts']
  //   },
  //   {
  //     id: 15,
  //     name: 'Public Interest Law',
  //     description: 'A community dedicated to legal aid, public defenders, and social justice initiatives.',
  //     memberCount: 43000,
  //     avatarUrl: '/path/to/image15.jpg',
  //     tags: ['Legal Aid', 'Public Defenders', 'Social Justice', 'Nonprofits', 'Advocacy']
  //   },
  //   {
  //     id: 16,
  //     name: 'Legal Education and Careers',
  //     description: 'For students, graduates, and professionals to discuss law schools, exams, and career advice.',
  //     memberCount: 78000,
  //     avatarUrl: '/path/to/image16.jpg',
  //     tags: ['Law Schools', 'Bar Exam', 'Legal Careers', 'Internships', 'Networking']
  //   }
  // ];
    
  // Function to load posts
  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/discussionforum/get?page=${page}&limit=10`);
      const newPosts = await response.json();
      setCardData(newPosts);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to load communities
  const loadCommunities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/community/get`);
      const newCommunities = await response.json();
      setCommunityData(newCommunities);
    } catch (error) {
      console.error("Error loading communities:", error);
    } finally {
      setIsLoading(false);
    }
  };


  // Scroll event listener
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
  //       loadPosts();
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isLoading]);

  // Initial load
  useEffect(() => {
    loadCommunities();
    loadPosts();
  }, []);


  const handleShowMore = () => {
    setVisibleCommunities(prev => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCommunities(3);
  };

  const handleNewPostClick = () => {
    setShowNewPost(true);
  };

  const handleHomeClick = () => {
    setShowNewPost(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-screen overflow-hidden">
      {/* Left Column */}
      <div className="bg-black bg-opacity-95 p-4 md:col-span-1">
        <div
          className="flex items-center p-2 rounded-lg hover:bg-amber-600 text-amber-600 hover:text-stone-900 transition duration-200 cursor-pointer"
          onClick={handleHomeClick}
        >
          <GoHome className="h-7 w-7" />
          <p className="px-2 font-bold">Home</p>
        </div>
  
        <div className="bg-gradient-to-r mt-5 from-amber-900 to-black/70 p-4 hidden md:block rounded-lg shadow-lg">
          <div className="max-w-full border border-amber-400 bg-black rounded-lg overflow-hidden">
            <div className="text-white p-4 text-sm">
              <p className="text-lg font-semibold text-amber-400 mb-4">COMMUNITIES</p>
              {communities ? (
                <div className="overflow-y-auto pr-2">
                  {communities.map((community, index) => (
                    <Link href={`/discussionforum/community/${community._id}`} key={index}>
                      <div className="flex items-start my-2 p-3 rounded-lg transition-all duration-150 hover:bg-black/30 cursor-pointer">
                        <img
                          className="h-12 w-12 rounded-full border-2 border-amber-400"
                          src={community.imageUrl}
                          alt={`${community.name}`}
                        />
                        <div className="ml-3 text-amber-200">
                          <p className="font-semibold text-md">{community.name}</p>
                          <p className="text-xs font-light text-amber-400">{community.members.length} Members</p>
                          <p className="text-xs mt-1 text-gray-300">{community.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <button
            onClick={handleNewPostClick}
            className="bg-amber-600 rounded-xl px-16 py-2 font-bold text-md text-center cursor-pointer"
          >
            POST
          </button>
        </div>

        <button
          onClick={() => setIsVertical(!isVertical)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 fixed bottom-20 right-20 z-20"
        >
          Current Layout : {isVertical ? "Vertical" : "Horizontal"}
        </button>
      </div>

      <div className="flex flex-col overflow-hidden md:col-span-4">
        <div
          className="flex-grow overflow-y-auto p-4"
          style={{
            backgroundImage: "url(/bg3.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {showNewPost ? (
            <div>
              <NewPost />
            </div>
          ) : (
            <div className="flex relative flex-col items-center space-y-4 p-4 rounded-lg">
              {/* Toggle Button */}
              <div className="flex top-[8rem] fixed top-28 left-25 z-10">
                <div className="font-bold text-2xl text-stone-50 px-4 py-2 rounded-lg shadow-md mb-2">
                  Posts :
                </div>
              </div>
  
              {/* PostCard Layout */}
              <div
                className={`${
                  isVertical
                    ? "flex flex-wrap gap-5 justify-center items-center space-y-4 mt-[50]" // Vertical Layout
                    : "flex flex-row space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400"
                } w-full`}
              >
                {cardData.map((card, index) => (
                  <Link href={`/discussionforum/posts/${card._id}`} key={index}>
                    <PostCard card={card} index={index} />
                  </Link>
                ))}
              </div>
  
              {/* Loading Spinner */}
              {isLoading && <Loading />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Page;
