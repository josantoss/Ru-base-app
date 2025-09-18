import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const PageLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
