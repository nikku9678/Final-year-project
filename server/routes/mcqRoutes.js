import express from "express";
import { isAuthenticate } from "../middlewares/auth.js"; // Middleware to verify token
import { createMCQ, createMultipleMCQs, getAllMCQs } from "../controllers/mcqController.js"; // Controller for MCQ logic

const router = express.Router();

// Route to create MCQ (Admin only)
router.post("/admin/mcq", isAuthenticate, createMCQ);
router.get("/admin/mcq", isAuthenticate, getAllMCQs);
router.post('/admin/mcqs', isAuthenticate, createMultipleMCQs);

export default router;
