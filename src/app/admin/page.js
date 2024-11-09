"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { data: session } = useSession();
  const [countdown, setCountdown] = useState(5);

  // If the user is not an admin, start countdown to redirect
  useEffect(() => {
    if (!session || session.user.role !== "admin") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = "/";
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [session]);

  // Log cardData whenever it updates
  useEffect(() => {
    console.log("Card data updated:", cardData);
  }, [cardData]);

  // Function to load posts
  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/discussionforum/get`);
      const newPosts = await response.json();
      setCardData(newPosts);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to run sentiment analysis for all posts
  const runSentimentAnalysis = async () => {
    setIsLoading(true);
    try {
      for (const post of cardData) {
        const response = await fetch("/api/sentimentanalysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: post.content,
            postId: post._id,
          }),
        });

        const result = await response.json();
        console.log("Sentiment analysis result:", result);
      }
      // After sentiment analysis is done, reload the posts to get updated metrics
      loadPosts();
    } catch (error) {
      console.error("Error running sentiment analysis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  // Unauthorized access message with countdown
  if (!session || session.user.role !== "admin") {
    return (
      <div className="my-5 flex flex-col items-center justify-center bg-gray-100">
        <p className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md font-semibold mb-4">
          ⚠️ You are not authorized to view this page.
        </p>
        <p className="text-gray-700">
          Redirecting to the home page in{" "}
          <span className="font-bold">{countdown}</span> seconds...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
    <Image
      src="/bg1.jpg"
      alt="Background Image"
      layout="fill"
      objectFit="cover"
      className="z-0"
    />
      <div className="min-h-screen absolute inset-0 bg-black bg-opacity-50 z-10 text-white flex">
        {/* Sidebar */}
        <aside className="w-1/5 bg-black text-orange-400 p-4">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <nav className="space-y-6">
            <a href="#" className="hover:text-orange-200">Dashboard</a>
            <a href="#" className="hover:text-orange-200">Flagged Posts</a>
            <a href="#" className="hover:text-orange-200">Users</a>
            <a href="#" className="hover:text-orange-200">Settings</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header with Search and Filter */}
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              placeholder="Search posts, users..."
              className="px-4 py-2 bg-black text-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <select className="px-4 py-2 bg-black text-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Filter by</option>
              <option>Flagged Posts</option>
              <option>Recent Posts</option>
              <option>Warnings Sent</option>
            </select>
          </div>

          {/* Sentiment Analysis Button */}
          <button
            onClick={runSentimentAnalysis}
            className="mb-8 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run Sentiment Analysis"}
          </button>

          {/* Posts Table */}
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Posts</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b border-orange-400 p-4">User ID</th>
                  <th className="border-b border-orange-400 p-4">Post Content</th>
                  <th className="border-b border-orange-400 p-4">Status</th>
                  <th className="border-b border-orange-400 p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cardData.map((card, index) => (
                  <tr key={index}>
                    <td className="border-b border-orange-600 p-4">
                      {card.user?.username || "Unknown"}
                    </td>
                    <td className="border-b border-orange-600 p-4">
                      {card.content.substring(0, 20)}...
                    </td>
                    <td className="border-b border-orange-600 p-4">Flagged</td>
                    <td className="border-b border-orange-600 p-4 space-x-2">
                      <Link href={`/admin/posts/${card._id}`}>
                        <button className="px-3 py-1 bg-orange-600 text-white rounded">
                          Review
                        </button>
                      </Link>
                      <button className="px-3 py-1 bg-orange-600 text-white rounded">
                        Warn
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>  
    </div>
  );
}
