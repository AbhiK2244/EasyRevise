import mongoose from "mongoose";

const aiInsightsSchema = new mongoose.Schema({
  summary: String,
  explanation: [String],
  commonMistakes: [String],
  optimization: [String],
}, { _id: false });

const codeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "c++",
  },
  topicTags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  nextReview: {
    type: Date, // For spaced repetition
  },
  aiInsights: aiInsightsSchema,
});

const Snippet = mongoose.model("Snippet", codeSchema);

export default Snippet;
