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
exports.deleteAssignmentDetailsFromDb = exports.getAssignmentsAssignedToStudentFromDb = exports.getOngoingAssignmentCreatedByTutorDetailsFromDb = exports.getScheduledAssignmentCreatedByTutorDetailsFromDb = exports.getAssignmentCreatedByTutorDetailsFromDb = exports.updateAssignmentInDb = exports.createAssignmentInDb = void 0;
const db_1 = require("../../lib/db");
const createAssignmentInDb = (assignmentDetails, submissionDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.raw("INSERT INTO assignments (id, description, published_at,deadline_date,created_by) VALUES (?,?,STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s'),STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s'),?)", [
            assignmentDetails.id,
            assignmentDetails.description,
            assignmentDetails.publishedAt,
            assignmentDetails.deadlineDate,
            assignmentDetails.tutorId,
        ]);
        yield db_1.db.raw("INSERT INTO submissions (id, remark, assignment_id,student_id,status) VALUES ?", [submissionDetails]);
        return "";
    }
    catch (error) {
        throw new Error("Failed to create assignment");
    }
});
exports.createAssignmentInDb = createAssignmentInDb;
const updateAssignmentInDb = (assignmentDetails, assignmentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(assignmentDetails, "assignmentDetails");
        yield db_1.db.raw("UPDATE assignments SET description=?,published_at=?,deadline_date=? WHERE id=? AND is_deleted=0", [
            assignmentDetails.description,
            assignmentDetails.publishedAt,
            assignmentDetails.deadlineDate,
            assignmentId,
        ]);
        return "";
    }
    catch (error) {
        console.error("Error updating user details with raw SQL:", error);
        throw new Error("Failed to update user details with raw SQL");
    }
});
exports.updateAssignmentInDb = updateAssignmentInDb;
const getAssignmentCreatedByTutorDetailsFromDb = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.db.raw("SELECT * FROM assignments WHERE created_by=? AND is_deleted=0", [tutorId]);
    console.log(response, "response");
    return response;
});
exports.getAssignmentCreatedByTutorDetailsFromDb = getAssignmentCreatedByTutorDetailsFromDb;
const getScheduledAssignmentCreatedByTutorDetailsFromDb = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.db.raw("SELECT * FROM assignments WHERE created_by=? AND published_at > NOW() AND is_deleted=0; ", [tutorId]);
    console.log(response, "response");
    return response;
});
exports.getScheduledAssignmentCreatedByTutorDetailsFromDb = getScheduledAssignmentCreatedByTutorDetailsFromDb;
const getOngoingAssignmentCreatedByTutorDetailsFromDb = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.db.raw("SELECT * FROM assignments WHERE created_by=? AND published_at <= NOW() AND is_deleted=0; ", [tutorId]);
    console.log(response, "response");
    return response;
});
exports.getOngoingAssignmentCreatedByTutorDetailsFromDb = getOngoingAssignmentCreatedByTutorDetailsFromDb;
const getAssignmentsAssignedToStudentFromDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data.query, "query");
        const response = yield db_1.db.raw(data.query, data.queryParams);
        console.log(response, "response");
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAssignmentsAssignedToStudentFromDb = getAssignmentsAssignedToStudentFromDb;
const deleteAssignmentDetailsFromDb = (assignmentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_1.db.raw(" UPDATE assignments SET is_deleted=1 WHERE id=?", [assignmentId]);
        return response;
    }
    catch (error) {
        console.error("Error updating user details with raw SQL:", error);
        throw new Error("Failed to update user details with raw SQL");
    }
});
exports.deleteAssignmentDetailsFromDb = deleteAssignmentDetailsFromDb;
