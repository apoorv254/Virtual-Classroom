"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignmentFeed = exports.getAssignmentDetails = exports.deleteAssignment = exports.updateAssignment = exports.createAssignment = void 0;
const assignmentService_1 = require("../../services/assignments/assignmentService");
const createAssignment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRole = req.user.role;
        if (userRole === "tutor") {
            const { description, deadlineDate, publishedAt, listOfStudents } = req.body;
            const tutorId = req.user.id;
            const assignmentId = yield (0, assignmentService_1.createAssignmentService)(description, deadlineDate, publishedAt, tutorId, listOfStudents);
            res.json({
                message: "Assignment created successfully",
                id: assignmentId,
            });
        }
        else {
            res
                .status(403)
                .json({ message: "You are not allowed to create assignment" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Unexpected Error Occured" });
    }
});
exports.createAssignment = createAssignment;
const updateAssignment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRole = req.user.role;
        if (userRole === "tutor") {
            const { description, deadlineDate, publishedAt } = req.body;
            const assignmentId = req.params.assignmentId;
            const updateAss = yield (0, assignmentService_1.updateAssignmentService)(description, deadlineDate, publishedAt, assignmentId);
            res.json({
                message: "Assignment updated successfully",
                assignment: updateAss,
            });
        }
        else {
            res
                .status(403)
                .json({ message: "You are not allowed to update assignment" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Unexpected Error Occured" });
    }
});
exports.updateAssignment = updateAssignment;
const deleteAssignment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRole = req.user.role;
        if (userRole === "tutor") {
            const assignmentId = req.params.assignmentId;
            yield (0, assignmentService_1.deleteAssignmentService)(assignmentId);
            res.json({ message: "Assignment deleted successfully" });
        }
        else {
            res
                .status(403)
                .json({ message: "You are not allowed to delete assignment" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Unexpected Error Occured" });
    }
});
exports.deleteAssignment = deleteAssignment;
const getAssignmentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const assignmentId = req.params.assignmentId;
        const finalDetails = yield (0, assignmentService_1.getSubmissionDetails)(userId, role, assignmentId);
        res.json(finalDetails);
    }
    catch (error) {
        res.status(500).json({ message: "Unexpected Error Occured" });
    }
});
exports.getAssignmentDetails = getAssignmentDetails;
const getAssignmentFeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        const { publishedAt, status } = req.query;
        const userId = req.user.id;
        if (userRole === "tutor") {
            const feedDetails = yield (0, assignmentService_1.getAssignmentCreatedByTutorDetails)(userId, publishedAt);
            res.json({ message: "Tutor assignment feed retrieved", feedDetails });
        }
        else if (userRole === "student") {
            const feedDetails = yield (0, assignmentService_1.getAllAssignmentsAssignedToStudent)(userId, status, publishedAt);
            res.json({
                message: "Student assignment feed retrieved with filters",
                feedDetails,
            });
        }
        else {
            res.status(403).json({ message: "Forbidden - Invalid user role" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Unexpected Error Occured" });
    }
});
exports.getAssignmentFeed = getAssignmentFeed;
