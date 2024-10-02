// app/layout.js
import React from 'react';
import '../../styles/globals.css'; // Make sure to import your global styles
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

      <Navbar/>
        <main>{children}</main>
      </body>
    </html>
  );
}
