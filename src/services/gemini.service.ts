const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
export const generate = async (prompt: string) => {
    const result = await model.generateContent(prompt);
    const response = await result.response
    return response.text()
}
