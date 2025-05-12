// import { YoutubeTranscript } from "youtube-transcript";

// export async function GET(req) {
//   try {

//     const transcript = await YoutubeTranscript.fetchTranscript("https://youtu.be/P6iRc0P9sKo?si=1Td2NX1TSFG81a1e");
//     const concatenatedText = transcript.map((item) => item.text).join(" ");

//     console.log(concatenatedText)
//     return new Response(JSON.stringify({ concatenatedText }), {
//       status: 200,
//         headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error in GET /youtube-summarizer:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
// }
// }
// app/api/process/route.js
import { NextResponse } from "next/server";

import puppeteer from "puppeteer";

export async function GET(req) {
  try {
    const input = "https://en.wikipedia.org/wiki/India";

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

    return NextResponse.json({
      success: true,
      message: "Data scraped and stored in Pinecone",
      url: pageData.paragraphs,
    });
  } catch (err) {
    console.error("Error in scrape handler:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
