"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assignmentController_1 = require("../../controllers/assignments/assignmentController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/assignment", authMiddleware_1.authenticateJwt, assignmentController_1.createAssignment);
router.put("/assignments/:assignmentId", authMiddleware_1.authenticateJwt, assignmentController_1.updateAssignment);
router.delete("/assignments/:assignmentId", authMiddleware_1.authenticateJwt, assignmentController_1.deleteAssignment);
router.get("/assignment/:assignmentId", authMiddleware_1.authenticateJwt, assignmentController_1.getAssignmentDetails);
router.get("/feed", authMiddleware_1.authenticateJwt, assignmentController_1.getAssignmentFeed);
exports.default = router;
