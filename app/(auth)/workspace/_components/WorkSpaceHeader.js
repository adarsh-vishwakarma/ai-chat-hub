"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Bot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WorkSpaceHeader = ({ fileName }) => {
  return (
    <div className="p-3 px-10 flex justify-between items-center w-full bg-black text-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Bot className="h-8 w-8 text-purple-500" />
        <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          AI Chat Hub
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-10 items-center">
  <Link
    href="/dashboard"
    className="text-white hover:text-gray-300 transition-colors font-medium border border-white/20 px-4 py-2 rounded-lg"
  >
    Dashboard
  </Link>
  <UserButton />
</div>

    </div>
  );
};

export default WorkSpaceHeader;
