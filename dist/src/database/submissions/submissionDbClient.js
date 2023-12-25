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
exports.submitAssignmentInDb = exports.getAllSubmissionAddedForAssignmentByAssignedStudent = exports.getOnlyStudentSubmission = void 0;
const db_1 = require("../../lib/db");
const getOnlyStudentSubmission = (studentId, assignmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.db.raw("SELECT remark,id,status from submissions WHERE student_id=? AND assignment_id =?;", [studentId, assignmentId]);
    return response[0][0];
});
exports.getOnlyStudentSubmission = getOnlyStudentSubmission;
const getAllSubmissionAddedForAssignmentByAssignedStudent = (assignmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.db.raw("SELECT remark,id,student_id,status from submissions WHERE assignment_id=?;", [assignmentId]);
    return response[0];
});
exports.getAllSubmissionAddedForAssignmentByAssignedStudent = getAllSubmissionAddedForAssignmentByAssignedStudent;
const submitAssignmentInDb = (submissionDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_1.db.raw(" UPDATE submissions SET remark=? ,status=? WHERE assignment_id=? AND student_id=?", [
            submissionDetails.submissionRemark,
            "SUBMITTED",
            submissionDetails.asssignmentId,
            submissionDetails.studentId,
        ]);
        return response;
    }
    catch (error) {
        throw new Error("Failed to submit assignment sql");
    }
});
exports.submitAssignmentInDb = submitAssignmentInDb;
