// app/layout.js
import React from "react";
import "../../styles/globals.css"; // Make sure to import your global styles
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        < ChatBot />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
