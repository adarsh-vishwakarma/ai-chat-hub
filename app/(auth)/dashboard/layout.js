import React from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="w-64 h-screen fixed">
        <Sidebar />
      </div>
      <div className="ml-64">
      <div>
        <Header />
        
      </div>
      {children}</div>
    </div>
  );
}

export default DashboardLayout;
