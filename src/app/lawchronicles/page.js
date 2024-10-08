"use client";
// app/blog/page.js
import React from "react";
import Navbar from "@/components/Navbar";

export default function ChroniclesPage() {
  const [data, setData] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/chronicles`, {
          credentials: "include",
        });
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="max-w-lg mx-auto my-10 p-5 border rounded shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Law Chronicles</h1>
    </div>
  );
}
