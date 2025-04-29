import { GoogleGenerativeAI } from "@google/generative-ai";


// Prompt template
const buildPrompt = (code) => `
You're an expert software engineering assistant.

Analyze the following code and provide the following in a structured JSON format:

1. **Summary**: A short and concise 2–3 sentence summary of what the code does.
2. **Step-by-step Explanation**: A clear, ordered breakdown of how the code works. Reply with appropriate html tag like if there is need to empasize on a word then use <strong>word<strong>.
3. **Common Mistakes**: Potential pitfalls or errors people might make when writing similar code. If there is no any mistakes then aknowledge it and reply back that there is no any mistake in the code snippet.
4. **Optimization Suggestions**: Tips to improve code readability, performance, or edge case handling. if the code is already optimized then aknowlege that and reply that it is already optimised no need to optimise it further.

Code:
\`\`\`
${code}
\`\`\`

Strictly note that summary should be a string and explanation, commonMistakes and optimization should in array of strings.
provide the text with appropriate html tag so that it can be parsed on the frontend.
Respond in this JSON format:
{
    "summary": "...",
    "explanation": ["...", "..."],
  "commonMistakes": ["...", "..."],
  "optimization": ["...", "..."]
}
`;

export const getInsightsFromGemini = async (code) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("This is the code.", code);
    console.log("API KEY", process.env.GEMINI_API_KEY)
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = buildPrompt(code);

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Try to safely parse the JSON from Gemini’s response
    const jsonStart = response.indexOf("{");
    const jsonEnd = response.lastIndexOf("}") + 1;
    const parsed = JSON.parse(response.slice(jsonStart, jsonEnd));
    console.log("parsed response", parsed)

    return {data: parsed, success: true};
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      message: "AI could not generate a response.",
      success: false
    };
  }
};
