// app/layout.js
import React from "react";
import "../../styles/globals.css"; // Make sure to import your global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
