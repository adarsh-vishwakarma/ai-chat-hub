'use client'
export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield, SquarePen } from "lucide-react";
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
    userEmail:user?.primaryEmailAddress?.emailAddress
  })
  console.log(GetFileInfo[0].upgrade)
  const fileList = useQuery(api.fileStorge.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  console.log(fileList);
  return (
    <div className="shadow-sm h-screen p-7">
      <Image src={"/logo.png"} alt="logo" width={120} height={120} />
      <div className="flex items-center gap-4 text-[12px]">
        FEATURES <SquarePen className="h-3 w-3" />
      </div>
      <div>
        <UploadPdfDialog isMaxFile={(fileList?.length >= 5 && !GetFileInfo[0].upgrade)? true : false}>
          <Button className="w-full cursor-pointer">+ Upload PDF</Button>
        </UploadPdfDialog>

        <Link href={'/dashboard'}>
        <div
          className={`flex  gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer ${path == "/dashboard" && "bg-slate-200"}`}
        >
          <Layout />
          <h2>Workspace</h2>
        </div>
        </Link>
        <Link href={'/dashboard/upgrade'}>
        <div
          className={`flex  gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer ${path == "/dashboard/upgrade" && "bg-slate-200"}`}
        >
          <Shield />
          <h2>Upgrade</h2>
        </div>
        </Link>
      </div>
      <div className="absolute bottom-20 w-[80%]">
        <Progress value={(fileList?.length / 5) * 100} />
        <p className="text-sm mt-1">{fileList?.length} out of 5 pdf Uploaded</p>
        <p className="text-sm text-gray-400 mt-2">Upgrade to Upload more PDF</p>
      </div>
    </div>
  );
};

export default Sidebar;
