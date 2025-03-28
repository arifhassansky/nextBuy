import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";
import NextAuthProvider from "../providers/NextAuthProvider";
import { Lato } from "next/font/google"; // Import Lato from Google Fonts
import { Metadata } from "next";
import "../globals.css";

// Configure Lato font
const lato = Lato({
  subsets: ["latin"], // Required: Specify the character subset
  weight: ["100", "300", "400", "700", "900"], // Specify desired weights
  variable: "--font-lato", // CSS variable for the font
});

export const metadata: Metadata = {
  title: "NextBuy",
  description: "Unbox Happiness Daily",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="light">
      <body className={`${lato.variable} antialiased`}>
        <div>
          <NextAuthProvider>
            <div className="flex gap-8">
              <Sidebar />
              <div className="w-full p-8">{children}</div>
            </div>
            <Footer />
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
