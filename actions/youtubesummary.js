"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from "youtube-transcript";

async function getData(concatenatedText) {
  try {
    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) throw new Error("Missing GOOGLE_GENAI_API_KEY");

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
      `You are an AI assistant specialized in converting raw text or transcripts into clear, structured study notes. I will provide you with a block of text (such as a YouTube transcript or lecture notes). Your job is to:

Analyze the text carefully and extract the core ideas.

Organize the information under clear headings and subheadings.

Use bullet points for important facts, examples, or steps.

Remove any unnecessary filler words or repeated content.

Maintain the original meaning but improve the readability and flow for studying or quick revision.

Here’s the text for analysis:

${concatenatedText}"`
    );

    return result.response.text();
  } catch (error) {
    console.error("Error in getData:", error);
    throw new Error("Failed to summarize with Gemini.");
  }
}

export async function youtubeSummarizer(inputText) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(inputText);
    const concatenatedText = transcript.map((item) => item.text).join(" ");
    const result = await getData(concatenatedText);
    return result;
  } catch (error) {
    console.error("Error in youtubeSummarizer:", error);
    throw new Error("Failed to fetch transcript or summarize.");
  }
}
