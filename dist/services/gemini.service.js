"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const generate = async (prompt) => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};
exports.generate = generate;
