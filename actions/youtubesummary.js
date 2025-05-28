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
`You are an intelligent AI assistant trained to convert YouTube transcripts or lecture content into clear, concise, and informative summaries.

Your task is to:
- Carefully analyze the provided text.
- Extract the main ideas and key takeaways.
- Present the information as a well-structured paragraph that maintains the original meaning.
- Ensure the output is easy to read, free from repetition or filler content, and suitable for study or quick revision.

Avoid using bullet points or headings. Just summarize the content naturally in paragraph form.

Here is the transcript for summarization:

${concatenatedText}`


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
