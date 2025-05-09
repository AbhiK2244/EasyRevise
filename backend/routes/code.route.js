import express from "express";
import { createCodeSnippet } from "../controller/code.controller.js";

const router = express.Router();

router.post("/", createCodeSnippet);

// router.get("/", getAllCodeSnippets);

// router.get("/:id", getCodeSnippetById);

// router.delete("/:id", deleteCodeSnippetById);

// router.put("/:id", updateCodeSnippetById);

// router.get("/tag/:tag", getCodeSnippetsByTag);

// router.get("/review/due", getCodeSnippetsDueForReview);

export default router;