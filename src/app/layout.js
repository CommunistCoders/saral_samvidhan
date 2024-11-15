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
          <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
          <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
        </body>
      </html>
    </SessionProvider>
  );
}
