import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");


const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generate = async (prompt: string) => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}
