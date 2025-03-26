import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";
import NextAuthProvider from "../providers/NextAuthProvider";

const DashboardLayout = ({ children }) => {
  return (
    <main>
      <NextAuthProvider>
        <Sidebar />
        {children}
        <Footer />
      </NextAuthProvider>
    </main>
  );
};

export default DashboardLayout;
