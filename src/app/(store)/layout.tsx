import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";
import NextAuthProvider from "../providers/NextAuthProvider";
import localFont from "next/font/local";
import { Metadata } from "next";
import "../globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NextBuy",
  description: "Unbox Happiness Daily",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
