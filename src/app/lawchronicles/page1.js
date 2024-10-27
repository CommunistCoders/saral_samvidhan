"use client";
// app/blog/page.js
import React from "react";
import { UserIcon } from "@heroicons/react/solid"; // Make sure you have installed heroicons.

export default function ChroniclesPage() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/chronicles`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.chronicles); // Assuming result.chronicles contains the array of data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full mx-auto my-10 p-5 border rounded shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Law Chronicles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="p-4 border rounded-md shadow-sm bg-white"
          >
            <div className="flex items-center">
              {/* Person Icon */}
              <UserIcon className="h-10 w-10 text-blue-700 mr-4" />
              <div>
                <p className="text-lg font-semibold text-blue-700">{item.email}</p>
                <p className="text-gray-700">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


  );
}
