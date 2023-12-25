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
exports.getAllAssignmentsAssignedToStudent = exports.getAssignmentCreatedByTutorDetails = exports.getSubmissionDetails = exports.deleteAssignmentService = exports.updateAssignmentService = exports.createAssignmentService = void 0;
const assignmentDbClient_1 = require("../../database/assignments/assignmentDbClient");
const submissionDbClient_1 = require("../../database/submissions/submissionDbClient");
const uuid_1 = require("uuid");
const createAssignmentService = (description, deadlineDate, publishedAt, tutorId, listOfStudents) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(description, "description");
    const assignmentDetails = {
        id: (0, uuid_1.v4)(),
        description,
        publishedAt,
        deadlineDate,
        tutorId,
    };
    const submissionDetails = listOfStudents.map((studentId) => [
        (0, uuid_1.v4)(),
        "",
        assignmentDetails.id,
        studentId,
        "PENDING",
    ]);
    yield (0, assignmentDbClient_1.createAssignmentInDb)(assignmentDetails, submissionDetails);
    return assignmentDetails.id;
});
exports.createAssignmentService = createAssignmentService;
const updateAssignmentService = (description, deadlineDate, publishedAt, assignmentId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(description, "description");
    let assignmentScheduled;
    const assignmentDetails = {
        description,
        publishedAt,
        deadlineDate,
    };
    yield (0, assignmentDbClient_1.updateAssignmentInDb)(assignmentDetails, assignmentId);
    return assignmentScheduled;
});
exports.updateAssignmentService = updateAssignmentService;
const deleteAssignmentService = (assignmentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, assignmentDbClient_1.deleteAssignmentDetailsFromDb)(assignmentId);
});
exports.deleteAssignmentService = deleteAssignmentService;
const getSubmissionDetails = (userId, role, assignmentId) => __awaiter(void 0, void 0, void 0, function* () {
    let submissionDetails;
    console.log(role, "role");
    if (role === "student") {
        submissionDetails = yield (0, submissionDbClient_1.getOnlyStudentSubmission)(userId, assignmentId);
    }
    else if (role === "tutor") {
        submissionDetails =
            yield (0, submissionDbClient_1.getAllSubmissionAddedForAssignmentByAssignedStudent)(assignmentId);
    }
    return submissionDetails;
});
exports.getSubmissionDetails = getSubmissionDetails;
const getAssignmentCreatedByTutorDetails = (tutorId, publishedAt) => __awaiter(void 0, void 0, void 0, function* () {
    let assDetails;
    if (publishedAt === "SCHEDULED") {
        console.log(publishedAt, "hello");
        assDetails = yield (0, assignmentDbClient_1.getScheduledAssignmentCreatedByTutorDetailsFromDb)(tutorId);
    }
    else if (publishedAt === "ONGOING") {
        console.log(publishedAt, "hello");
        assDetails = yield (0, assignmentDbClient_1.getOngoingAssignmentCreatedByTutorDetailsFromDb)(tutorId);
    }
    else {
        assDetails = yield (0, assignmentDbClient_1.getAssignmentCreatedByTutorDetailsFromDb)(tutorId);
    }
    return assDetails[0];
});
exports.getAssignmentCreatedByTutorDetails = getAssignmentCreatedByTutorDetails;
const getAllAssignmentsAssignedToStudent = (studentId, status, publishedAt) => __awaiter(void 0, void 0, void 0, function* () {
    const data = queryBuilder(studentId, publishedAt, status);
    console.log(data, "data");
    const assDetails = yield (0, assignmentDbClient_1.getAssignmentsAssignedToStudentFromDb)(data);
    return assDetails[0];
});
exports.getAllAssignmentsAssignedToStudent = getAllAssignmentsAssignedToStudent;
const queryBuilder = (studentId, publishedAt, status) => {
    let query = "SELECT a.* FROM assignments a JOIN submissions s ON a.id=s.assignment_id  WHERE s.student_id=? AND a.is_deleted=0";
    const queryParams = [studentId];
    if (publishedAt === "SCHEDULED") {
        query += " AND a.published_at > NOW()";
    }
    else if (publishedAt === "ONGOING") {
        query += " AND a.published_at <= NOW()";
    }
    if (status === "PENDING" || status === "SUBMITTED") {
        query += " AND s.status = ?";
        queryParams.push(status);
    }
    if (status === "OVERDUE") {
        query += " AND s.status !='SUBMITTED' AND deadline_date < NOW()";
    }
    return { query, queryParams };
};
