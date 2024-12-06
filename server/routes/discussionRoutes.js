import express from "express";
import { isAuthenticate } from "../middlewares/auth.js"; // Middleware to verify token

import { addComment,getAllDiscussions,createDiscussion,likeDiscussion, getAllComments } from "../controllers/discussCtrl.js";
const router = express.Router();


router.get("/discuss", isAuthenticate, getAllDiscussions);
router.post("/discuss", isAuthenticate, createDiscussion);
router.post("/discuss/:discussionId/comment", isAuthenticate, addComment);
router.get("/discuss/comment", isAuthenticate, getAllComments);
router.post("/discuss/:discussionId/like", isAuthenticate, likeDiscussion);

export default router;
