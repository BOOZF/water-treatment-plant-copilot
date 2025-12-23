
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCopilotResponse = async (query: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context}\n\nUser Question: ${query}`,
      config: {
        systemInstruction: `You are the PUB Water Treatment Copilot. 
        Your goal is to provide explainable, data-driven reasoning for water treatment plant operations.
        Always maintain safety-critical perspective. 
        Explain 'Why' based on the provided context (Alarms, Asset Health, Trends). 
        Do not suggest control actions; only suggest investigation steps.
        Format your response in Markdown with clear sections.`,
        temperature: 0.2,
      },
    });
    return response.text || "I'm sorry, I couldn't process that query.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error communicating with AI service. Please check your connectivity.";
  }
};

export const getRCAExplanation = async (situation: string, evidence: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Situation: ${situation}\nEvidence: ${evidence}`,
      config: {
        systemInstruction: `Analyze the following water treatment plant alarm situation. 
        Determine the root cause vs symptoms. Explain the physical relationship (e.g. Pump failure leads to flow loss leads to analyzer low).
        Return a response structured as: 
        1. What Happened
        2. Why it Likely Happened
        3. Evidence Used
        4. Suggested Investigation Steps.`,
        temperature: 0,
      },
    });
    return response.text || "Reasoning unavailable.";
  } catch (error) {
    return "Failed to generate RCA explanation.";
  }
};
