import Providers from "@/lib/Providers";
import type { Metadata } from "next";
import { Lato } from "next/font/google"; // Import Lato from Google Fonts
import { Toaster } from "react-hot-toast";
import "../globals.css";
import NextAuthProvider from "../providers/NextAuthProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" data-theme="light">
        <body className={`${lato.variable} antialiased`}>
          <NextAuthProvider>
            <Navbar />
            <Toaster position="top-right" />
            {children}
            <Footer />
          </NextAuthProvider>
        </body>
      </html>
    </Providers>
  );
}
