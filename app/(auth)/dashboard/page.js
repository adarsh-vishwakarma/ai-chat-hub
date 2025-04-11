'use client'
export const dynamic = 'force-dynamic';

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQueries, useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();
  console.log(user?.primaryEmailAddress?.emailAddress)
  const fileList = useQuery(api.fileStorge.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  console.log(fileList);
  
  return (
    <div className="p-5 h-screen">
       <h1 className="mb-3 font-bold text-5xl">My Files</h1>
       <div className="w-full h-[1px] bg-gray-200 mb-3 mt-8"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {fileList?.length > 0
          ? fileList?.map((file, index) => (
              <Link href={"/workspace/" + file.fileId}>
                <div
                  key={index}
                  className="flex p-4 shadow-md flex-col items-center justify-center border border-white/10 bg-white/5 rounded-xl hover:scale-105 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  <Image src={"/pdf.png"} alt="file" width={50} height={50} />
                  <h2 className="mt-3 font-medium text-lg">{file?.fileName}</h2>
                  <h2> {new Date(file?._creationTime).toLocaleDateString()}</h2>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 rounded-md h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
