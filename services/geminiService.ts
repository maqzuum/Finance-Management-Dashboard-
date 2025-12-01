import { GoogleGenAI } from "@google/genai";
import { Message, StatGroup } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateDashboardInsight = async (
  stats: StatGroup[],
  recentMessages: Message[]
): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "Please configure your API Key to generate insights.";
  }

  const prompt = `
    Analyze the following sales dashboard data and provide a brief, executive summary (max 3 sentences) focusing on performance and areas for improvement.
    
    Stats: ${JSON.stringify(stats)}
    Recent Messages Sample: ${JSON.stringify(recentMessages.slice(0, 3))}
    
    Tone: Professional, encouraging, and data-driven.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No insights available.";
  } catch (error) {
    console.error("Error generating insights:", error);
    return "Unable to generate insights at this time.";
  }
};
