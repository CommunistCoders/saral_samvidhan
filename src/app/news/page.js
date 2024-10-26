"use client";
import React, { useEffect, useState } from "react";
import NewsCard from "@/app/components/newscard";

function NewsBlock() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20); // Number of visible articles

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/news`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log("result = ", result);
        setData(result.articles || result); // Depending on the response structure.
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20); // Increase the number of visible articles by 20
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const visibleData = data.slice(1, visibleCount); // Ignore the first item

  return (
    <div>
        <h1 className="bg-blue-900 text-white p-7 text-4xl text-center font-bold">Today's News</h1>
        <div className="flex flex-wrap justify-between mt-3">
        {visibleData.length > 0 ? (
            visibleData.map((item, index) => (
            <div key={index} className="flex-grow mb-6 w-full md:w-1/2 lg:w-1/3 px-2"> {/* Full width on small screens, 50% on medium, 33% on large */}
                <NewsCard {...item} />
            </div>
            ))
        ) : (
            <p>No news available.</p>
        )}
        {visibleData.length < data.length && ( // Show button if more articles are available
            <div className="w-full mt-4">
            <button
                onClick={handleLoadMore}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Load More
            </button>
            </div>
        )}
        </div>
    </div>
  );
}

export default NewsBlock;