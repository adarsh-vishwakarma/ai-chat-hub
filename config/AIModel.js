const {
    GoogleGenerativeAI,

  } = require("@google/generative-ai");

  
  const apiKey = "AIzaSyD04N0MbHkFRfDX1wHgtHwtmBT0LW4efLs";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };
  
 
    export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    //    console.log(result.response.text());
  
  
