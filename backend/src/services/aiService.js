const { GoogleGenerativeAI } = require('@google/generative-ai');

// Phase 10A: Initialize the Gemini AI client using the API key from our .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeEwaste = async (fileBuffer, mimeType) => {
  // 1. Select the specific AI model we want to use. 
  // 'gemini-flash-latest' is extremely fast and natively supports "vision" (looking at images).
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  // 2. Phase 10B: Prompt Engineering
  // We use clear instructions to force the AI to return a strict, predictable JSON format.
  // If we just ask "what is this?", it will return a conversational paragraph that our frontend can't parse.
  const prompt = `
    You are an expert in electronics, e-waste management, and hardware recycling.
    Analyze the attached image of an electronic component or device.
    
    You MUST respond with a valid JSON object ONLY, containing the exact following fields:
    - "componentName": string (The specific name of the item)
    - "category": string (e.g., Microcontroller, Battery, PCB, Display)
    - "reuseScore": number (1 to 100, where 100 is perfectly reusable)
    - "hazardLevel": string ("Low", "Medium", "High" - based on toxic materials like lead or lithium)
    - "repairable": boolean
    - "resaleValue": string (Estimated value, e.g., "$10-$15" or "$0")
    - "diyIdeas": array of strings (2 or 3 short ideas on how to reuse it)
    - "safetyInstructions": string (How to handle it safely)

    Do NOT wrap the JSON in markdown code blocks like \`\`\`json. Return raw JSON only.
  `;

  // 3. Phase 10C: Buffer Streaming
  // Package the RAM buffer into the specific "Inline Data" format Google expects (Base64)
  const imageParts = [
    {
      inlineData: {
        data: fileBuffer.toString("base64"),
        mimeType: mimeType
      }
    }
  ];

  try {
    // Trigger the AI request with both the text prompt and the image
    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text();
    
    // Safety Fallback: Clean the text in case the AI accidentally adds markdown formatting despite our prompt
    const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Convert the text string back into a real JavaScript object
    return JSON.parse(cleanJsonString);
  } catch (error) {
    throw new Error('Gemini AI Analysis Failed: ' + error.message);
  }
};

module.exports = {
  analyzeEwaste,
  genAI
};
