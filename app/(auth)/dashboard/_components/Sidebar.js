"use client";
export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Layout,
  Shield,
  SquarePen,
  Home,
  Wallet,
  Repeat,
  BarChart,
  Settings,
  Gift,
  HelpCircle,
  TrendingUp,
  LineChart,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const { user } = useUser();
  const path = usePathname();
  const GetFileInfo = useQuery(api.user.GetUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  const fileList = useQuery(api.fileStorge.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  //     
  //       <Link href="/dashboard/upgrade">
  //         <div
  //           className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
  //             path === "/dashboard/upgrade" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-700"
  //           }`}
  //         >
  //           <Shield className="w-5 h-5" />
  //           <span className="text-sm font-medium">Upgrade</span>
  //         </div>
  //       </Link>

  return (
    <aside className="bg-black text-white h-screen w-64 p-6 flex flex-col justify-between border-r border-white/10">
      {/* Top Brand */}
      <div>
        <h1 className="text-xl font-bold text-white mb-10 flex items-center gap-2">
          <span className="w-3 h-3 bg-orange-500 rounded-full" /> Cryptolink
        </h1>
        <UploadPdfDialog
          isMaxFile={
            fileList?.length >= 5 && !GetFileInfo?.[0]?.upgrade ? true : false
          }
        >
          <Button className="w-full mb-6 hover:cursor-pointer">+ Upload PDF</Button>
        </UploadPdfDialog>
        {/* Main Section */}
        <div className="mt-5">
          <h2 className="text-xs text-gray-500 mb-2">MAIN</h2>
          <nav className="flex flex-col gap-1 text-sm">
            <Link href="/dashboard">
              <SidebarItem icon={<Home size={18} />} label="Dashboard" active={path === "/dashboard"} />
            </Link>
            <Link href="/dashboard/upgrade">

            <SidebarItem icon={<Wallet size={18} />} label="Wallet" active={path === "/dashboard/upgrade"}/>
            </Link>
            <SidebarItem icon={<Repeat size={18} />} label="Transactions" />

            <SidebarItem
              icon={<LineChart size={18} />}
              label="Markets"
              badge="NEW"
            />
          </nav>
        </div>

        {/* Other Section */}
        <div className="mt-6">
          <h2 className="text-xs text-gray-500 mb-2">OTHER</h2>
          <nav className="flex flex-col gap-1 text-sm">
            <SidebarItem icon={<Settings size={18} />} label="Settings" />
            <SidebarItem icon={<Gift size={18} />} label="Rewards" />
            <SidebarItem icon={<HelpCircle size={18} />} label="Support" />
          </nav>
        </div>
      </div>
      {/* Progress Info */}
      <div className="w-full mb-10">
        <Progress
          value={(fileList?.length / 5) * 100}
          className="mb-2 bg-white"
        />
        <p className="text-sm font-medium">
          {fileList?.length || 0} out of 5 PDFs Uploaded
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Upgrade to upload more PDFs
        </p>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, badge, active }) => (
  <div
    className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer 
      ${active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {badge && (
      <span className="text-orange-500 text-xs font-semibold">{badge}</span>
    )}
  </div>
);
export default Sidebar;
