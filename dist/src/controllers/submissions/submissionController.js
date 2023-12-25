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
exports.addSubmission = void 0;
const submissionService_1 = require("../../services/submissions/submissionService");
const addSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = req.user.role;
        if (role === "student") {
            const studentId = req.user.id;
            const assignmentId = req.body.assignmentId;
            const submissionRemark = req.body.remark;
            const submissionId = yield (0, submissionService_1.submitAssignment)(assignmentId, submissionRemark, studentId);
            res.json({ message: "Submission added successfully", id: submissionId });
        }
        else {
            res
                .status(401)
                .json({ message: "You are Not allowed to submit the assignment" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "some Error Occured" });
    }
});
exports.addSubmission = addSubmission;
