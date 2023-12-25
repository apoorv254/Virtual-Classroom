import express from "express";
import { addSubmission } from "../../controllers/submissions/submissionController";
import { authenticateJwt } from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/submission", authenticateJwt, addSubmission);

export default router;
