// app/layout.js
import React from 'react';
import '../../styles/globals.css'; // Make sure to import your global styles
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
