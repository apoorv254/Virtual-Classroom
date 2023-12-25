import express from "express";
import {
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentDetails,
  getAssignmentFeed,
} from "../../controllers/assignments/assignmentController";
import { authenticateJwt } from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/assignment", authenticateJwt, createAssignment);
router.put("/assignments/:assignmentId", authenticateJwt, updateAssignment);
router.delete("/assignments/:assignmentId", authenticateJwt, deleteAssignment);
router.get("/assignment/:assignmentId", authenticateJwt, getAssignmentDetails);
router.get("/feed", authenticateJwt, getAssignmentFeed);

export default router;
