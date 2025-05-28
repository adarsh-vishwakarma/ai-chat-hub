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
  Bot,
  Youtube,
  Earth,
  Code,
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

  return (
    <aside className="bg-black text-white h-screen w-64 p-6 flex flex-col justify-between border-r border-white/10">
      {/* Top Brand */}
      <div>
        <Link href={'/'} className="flex items-center mb-10">
          <Bot className="h-8 w-8 text-purple-500" />
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI Chat Hub
          </span>
        </Link>

        <UploadPdfDialog
          isMaxFile={
            fileList?.length >= 5 && !GetFileInfo?.[0]?.upgrade ? true : false
          }
        >
          <Button className="w-full mb-6 hover:cursor-pointer">
            + Upload PDF
          </Button>
        </UploadPdfDialog>
        {/* Main Section */}
        <div className="mt-5">
          <h2 className="text-xs text-gray-500 mb-2">MAIN</h2>
          <nav className="flex flex-col gap-1 text-sm">
            <Link href="/dashboard">
              <SidebarItem
                icon={<Home size={18} />}
                label="Dashboard"
                active={path === "/dashboard"}
              />
            </Link>
            <Link href="/dashboard/upgrade">
              <SidebarItem
                icon={<Shield size={18} />}
                label="Upgrade"
                active={path === "/dashboard/upgrade"}
              />
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
          <Link href={'/youtube-summarizer'}>

            <SidebarItem icon={<Youtube size={18} />} label="YouTube Summarizer" active={path === "/youtube-summarizer"}/>
          </Link>
           <Link href={'/web-chat'}>

            <SidebarItem icon={<Earth size={18} />} label="Chat with Website" active={path === "/web-chat"}/>
          </Link>
             <Link href={'/chat-gpt'}>

            <SidebarItem icon={<Code size={18} />} label="AI Assistant" active={path === "/chat-gpt"}/>
          </Link>
          </nav>
        </div>
      </div>
      {/* Progress Info */}
      <div className="w-full mb-10">
        <Progress
          value={(fileList?.length / 5) * 100}
          className="mb-2 bg-black [&>div]:bg-white"
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
