
import { GoogleGenAI } from "@google/genai";
import type { StudyPlanResponse, Source } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    // This is critical for the app's core functionality.
    throw new Error("API_KEY environment variable not set. The application cannot function.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateStudyPlan = async (goal: string): Promise<StudyPlanResponse> => {
  const prompt = `
    As an AI-powered study assistant, analyze the following student's learning goal. Use your search capabilities to find the most relevant, high-quality, and up-to-date online learning resources for this goal. Base your "resources" recommendations on your search findings.

    **Learning Goal:** "${goal}"

    After conducting your search, create a comprehensive, personalized study plan. Generate a response in a pure JSON format, without any markdown formatting (e.g., no \`\`\`json). The JSON object must contain three top-level keys: "studyPlan", "resources", and "wellnessTips".

    1.  **studyPlan**: An array of objects. Each object represents a study session or break and must have the following properties:
        *   "day" (number): The day number in the plan (e.g., 1, 2).
        *   "topic" (string): The main topic for the session or break type (e.g., "Introduction to React Hooks", "Lunch Break").
        *   "duration" (string): The estimated time for the task (e.g., "2 hours", "45 minutes").
        *   "isBreak" (boolean): 'true' if this is a break, 'false' otherwise.
        *   "details" (string): Specific sub-topics, exercises, or activities.

    2.  **resources**: An array of 3-5 objects based on your web search. Each object represents a high-quality learning resource and must have these properties:
        *   "title" (string): The title of the resource.
        *   "type" (string): The resource type. Must be one of: 'Video', 'Article', 'Interactive Tutorial', 'Documentation', 'Book'.
        *   "url" (string): A direct URL to the resource.
        *   "description" (string): A brief, compelling reason why this resource is useful.

    3.  **wellnessTips**: An array of 3 unique, actionable wellness tips for students (e.g., advice on breaks, mindfulness, physical health). Each tip should be a string.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const cleanedJson = jsonText.replace(/^```json\s*|```\s*$/g, '');
    const planData = JSON.parse(cleanedJson) as Omit<StudyPlanResponse, 'sources'>;

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: Source[] = [];
    if (groundingChunks) {
        for (const chunk of groundingChunks) {
            if (chunk.web && chunk.web.uri) {
                sources.push({
                    title: chunk.web.title || new URL(chunk.web.uri).hostname,
                    uri: chunk.web.uri,
                });
            }
        }
    }
    
    // Remove duplicate sources based on URI
    const uniqueSources = Array.from(new Map(sources.map(item => [item['uri'], item])).values());

    return {
        ...planData,
        sources: uniqueSources.length > 0 ? uniqueSources : undefined,
    };

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate study plan from Gemini API.");
  }
};
