// src/app/page.js
import React from "react";
import Navbar from "@/components/NavBar";

const HomePage = () => {
  return (
    <main>
      <Navbar /> {/* Use Navbar here */}
      <div>
        <h1>Welcome to Our Website!</h1>
        <p>This is the homepage of our awesome Next.js site.</p>
      </div>
    </main>
  );
};


export default HomePage;
