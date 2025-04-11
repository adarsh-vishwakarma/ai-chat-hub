import React from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div>
      {/* Sidebar - fixed on the left */}
      <div className="w-64 h-screen fixed left-0 top-0 z-40">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="ml-64">
        <Header /> {/* Fixed header, already has pl-64 in Header component */}
        
        {/* Page content with margin-top to avoid header overlap */}
        <main className="mt-15 p-10 bg-black text-white">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
