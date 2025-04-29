import Snippet from "../models/codeSchema.js";
import { getInsightsFromGemini } from "../services/gemini.service.js";
import { calculateNextReviewDate } from "../utils/calculateNextReviewDate.js";

export const createCodeSnippet = async (req, res) => {
    console.log("req body", req.body)
  const { title, code, language, topicTags } = req.body;

  try {
    const insights = await getInsightsFromGemini(code);
    if(!insights?.success)
    {
        throw new Error("AI could not generate a response.")
    }
    const nextReview = calculateNextReviewDate(1);

    const snippet = await Snippet.create({
      title,
      code,
      language,
      topicTags,
      aiInsights: insights?.data,
      nextReview,
    });

    res.status(201).json(snippet);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create snippet", message: err.message });
  }
};
