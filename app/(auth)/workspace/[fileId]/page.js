"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditor from "../_components/TextEditor";

function WorkSpace() {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorge.GetFileRecord, {
    fileId: fileId,
  });
  //   const GetFileInfo = async () => {
  //     const result = await GetFileInfo({ fileId: fileId });
  //   };
  useEffect(() => {
    console.log(fileInfo);
  }, [fileInfo]);
  return (
    <div>
    
      <WorkSpaceHeader />
    
      <div className="grid grid-cols-2 gap-5">
        <div><TextEditor fileId={fileId}/></div>
        <div>
          {fileInfo?.length > 0 ? (
            <PdfViewer fileUrl={fileInfo[0].fileUrl} />
          ) : (
            <div>Loading PDF...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
