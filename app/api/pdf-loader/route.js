import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const pdfUrl = "https://clever-dogfish-57.convex.cloud/api/storage/238d0820-06a4-4cbc-ac80-7a43af69925d"
export async function GET(req) {

    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl)
    const pdfUrl = searchParams.get('pdfUrl')
    console.log(pdfUrl)
    const response  = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = ''
    docs.forEach(doc => {
        pdfTextContent = pdfTextContent+doc.pageContent
    })

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 20,
      });
      const output = await splitter.createDocuments([pdfTextContent])
      let splitterList = [];
      output.forEach(doc=> {
        splitterList.push(doc.pageContent)
      })
    return NextResponse.json({
        result: splitterList
    })
}