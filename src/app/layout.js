// app/layout.js
'use client'
import React from "react";
import "../../styles/globals.css"; // Make sure to import your global styles
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ChatBot from "@/app/components/ChatBot";
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          < ChatBot />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
      </SessionProvider>
  );
}
