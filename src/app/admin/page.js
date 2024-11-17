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
  const [deletingPostId, setDeletingPostId] = useState(null);

  // If the user is not an admin, start countdown to redirect
  useEffect(() => {
    if (!session || session.user.role !== "admin") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            if (typeof window !== "undefined") {
              window.location.href = "/";
            }
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
        if (!post.isReviewed) {
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
  
  const handleDelete = async (postId) => {
    try {
      setDeletingPostId(postId); // Set the post being deleted
      const response = await fetch(`/api/discussionforum/delete?postId=${postId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        // Optionally, remove the deleted post from the UI
        // For example, you can filter out the deleted post from cardData
        setCardData((prevData) => prevData.filter(card => card._id !== postId));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    } finally {
      setDeletingPostId(null); // Reset the deleting state after the operation
    }
  };
  
  const reviewedPosts = cardData.filter(post => post.isReviewed);

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

          {/* Table to show reviewed posts */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">Reviewed Posts</h2>
            <table className="w-full mt-4 text-left text-sm">
              <thead>
                <tr>
                  <th className="border-b border-orange-600 p-2">Title</th>
                  <th className="border-b border-orange-600 p-2">User</th>
                  <th className="border-b border-orange-600 p-2">Content</th>
                </tr>
              </thead>
              <tbody>
                {reviewedPosts.length > 0 ? (
                  reviewedPosts.map((post, index) => (
                    <tr key={index}>
                      <td className="border-b border-orange-600 p-2">{post.title}</td>
                      <td className="border-b border-orange-600 p-2">{post.user?.username || "Unknown"}</td>
                      <td className="border-b border-orange-600 p-2">{post.content.substring(0, 20)}...</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="border-b border-orange-600 p-2 text-center">No reviewed posts found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-8">

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
                  <th className="border-b border-orange-400 p-4">User Name</th>
                  <th className="border-b border-orange-400 p-4">Post Content</th>
                  <th className="border-b border-orange-400 p-4">Status</th>
                  <th className="border-b border-orange-400 p-4">Actions</th>
                </tr>
              </thead>
            </table>
            <div className="overflow-y-auto max-h-[500px]">
            <table className="w-full text-left">
              <tbody>
                {cardData
                  .filter(card => !card.isReviewed) // Filter out posts that are reviewed
                  .map((card, index) => (
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
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded"
                          onClick={() => handleDelete(card._id)}
                          disabled={deletingPostId === card._id} // Disable the button for the post being deleted
                        >
                          {deletingPostId === card._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>
          </div>
        </main>
      </div>  
    </div>
  );
}
