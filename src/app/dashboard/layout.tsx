import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <main>
      <Sidebar />
      {children}
      <Footer />
    </main>
  );
};

export default DashboardLayout;
