// app/api/process/route.js
import { NextResponse } from "next/server";
import { GoogleGenerativeAI, TaskType } from "@google/generative-ai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

import puppeteer from "puppeteer";
import { Pinecone } from "@pinecone-database/pinecone";

export async function POST(req) {
  try {
    const body = await req.json();
    const { input } = body;

    const pc = new Pinecone({
      apiKey:
       process.env.PINECONE_API_KEY,
    });
    const indexName = "ai-chat";

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(input, { waitUntil: "load" });

    const pageData = await page.evaluate(() => {
      return {
        title: document.title,
        heading: document.querySelector("h1")?.innerText,
        paragraphs: Array.from(document.querySelectorAll("p")).map(
          (p) => p.innerText
        ),
      };
    });

    await browser.close();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const output = await splitter.createDocuments(pageData.paragraphs);
    const splitterList = output.map((item) => item.pageContent);

    const genAi = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
      model: "text-embedding-004", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    });

    const embeddings = await genAi.embedDocuments(splitterList);

    const formattedEmbeddings = embeddings.map((embedding) => ({
      values: embedding,
    }));

    const vectors = splitterList.map((text, i) => ({
      id: `vec1${i + 1}`,
      values: formattedEmbeddings[i].values,
      metadata: { text },
    }));

    const index = pc.index(indexName);
    await index.namespace(pageData.title).upsert(vectors);

    return NextResponse.json({
      success: true,
      message: "Data scraped and stored in Pinecone",
      url: pageData.title
    });
  } catch (err) {
    console.error("Error in scrape handler:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}







async function chatAi(concatenatedText, query) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(
    `For question: ${query} and with the given content as answer, please give appropriate answer in text format. The answer content is ${concatenatedText}`
  );

  return result.response.text();
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    console.log(searchParams)
    const query = searchParams.get("input");
    const decoded = searchParams.get("decoded");
  
     const nameSpace = decodeURIComponent(decoded);
     console.log(nameSpace)

     const pc = new Pinecone({
      apiKey:
        process.env.PINECONE_API_KEY,
    });
    const indexName = "ai-chat";

    const index = pc.index("ai-chat");

   const genAi = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
      model: "text-embedding-004", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    });


    const queryEmbeddings = await genAi.embedDocuments([query]);
    const singleQueryEmbeddings = queryEmbeddings[0];

    const queryResponse = await index.namespace(nameSpace).query({
      topK: 3,
      vector: singleQueryEmbeddings,
      includeValues: false,
      includeMetadata: true,
    });

    const concatenatedText = queryResponse.matches
      .map((match) => match.metadata.text)
      .join("\n");

    const aiResult = await chatAi(concatenatedText, query);

    return Response.json({ result: aiResult });
  } catch (error) {
    console.error("GET API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}