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
    <div className="p-5">
      <h2 className="font-medium text-3xl">WorkSpace</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {fileList?.length > 0
          ? fileList?.map((file, index) => (
              <Link href={"/workspace/" + file.fileId}>
                <div
                  key={index}
                  className="flex p-5 shadow-md flex-col items-center justify-center border-2 hover:cursor-pointer hover:scale-105 transition-all"
                >
                  <Image src={"/pdf.png"} alt="file" width={50} height={50} />
                  <h2 className="mt-3 font-medium text-lg">{file?.fileName}</h2>
                  <h2>{file?._creationTime}</h2>
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
