import { YoutubeTranscript } from "youtube-transcript";

export async function GET(req) {
  try {
    
    const transcript = await YoutubeTranscript.fetchTranscript("https://youtu.be/P6iRc0P9sKo?si=1Td2NX1TSFG81a1e");
    const concatenatedText = transcript.map((item) => item.text).join(" ");
    
    console.log(concatenatedText)
    return new Response(JSON.stringify({ concatenatedText }), {
      status: 200,
        headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET /youtube-summarizer:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
}
}