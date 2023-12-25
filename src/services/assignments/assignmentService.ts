import {
  createAssignmentInDb,
  deleteAssignmentDetailsFromDb,
  getAssignmentCreatedByTutorDetailsFromDb,
  getAssignmentsAssignedToStudentFromDb,
  getOngoingAssignmentCreatedByTutorDetailsFromDb,
  getScheduledAssignmentCreatedByTutorDetailsFromDb,
  updateAssignmentInDb,
} from "../../database/assignments/assignmentDbClient";
import {
  getAllSubmissionAddedForAssignmentByAssignedStudent,
  getOnlyStudentSubmission,
} from "../../database/submissions/submissionDbClient";
import { v4 as uuidv4 } from "uuid";

export const createAssignmentService = async (
  description: string,
  deadlineDate: Date,
  publishedAt: Date,
  tutorId: string,
  listOfStudents: any
) => {
  console.log(description, "description");

  const assignmentDetails = {
    id: uuidv4(),
    description,
    publishedAt,
    deadlineDate,
    tutorId,
  };

  const submissionDetails = listOfStudents.map((studentId: string) => [
    uuidv4(),
    "",
    assignmentDetails.id,
    studentId,
    "PENDING",
  ]);

  await createAssignmentInDb(assignmentDetails, submissionDetails);

  return assignmentDetails.id;
};

export const updateAssignmentService = async (
  description: string,
  deadlineDate: Date,
  publishedAt: Date,
  assignmentId: string
) => {
  console.log(description, "description");
  let assignmentScheduled: any;

  const assignmentDetails = {
    description,
    publishedAt,
    deadlineDate,
  };

  await updateAssignmentInDb(assignmentDetails, assignmentId);

  return assignmentScheduled;
};

export const deleteAssignmentService = async (assignmentId: string) => {
  await deleteAssignmentDetailsFromDb(assignmentId);
};

export const getSubmissionDetails = async (
  userId: string,
  role: string,
  assignmentId: string
) => {
  let submissionDetails;
  console.log(role, "role");
  if (role === "student") {
    submissionDetails = await getOnlyStudentSubmission(userId, assignmentId);
  } else if (role === "tutor") {
    submissionDetails =
      await getAllSubmissionAddedForAssignmentByAssignedStudent(assignmentId);
  }

  return submissionDetails;
};

export const getAssignmentCreatedByTutorDetails = async (
  tutorId: string,
  publishedAt: string
) => {
  let assDetails: any;

  if (publishedAt === "SCHEDULED") {
    console.log(publishedAt, "hello");
    assDetails = await getScheduledAssignmentCreatedByTutorDetailsFromDb(
      tutorId
    );
  } else if (publishedAt === "ONGOING") {
    console.log(publishedAt, "hello");
    assDetails = await getOngoingAssignmentCreatedByTutorDetailsFromDb(tutorId);
  } else {
    assDetails = await getAssignmentCreatedByTutorDetailsFromDb(tutorId);
  }
  return assDetails[0];
};

export const getAllAssignmentsAssignedToStudent = async (
  studentId: string,
  status: string,
  publishedAt: string
) => {
  const data = queryBuilder(studentId, publishedAt, status);
  console.log(data, "data");

  const assDetails = await getAssignmentsAssignedToStudentFromDb(data);
  return assDetails[0];
};

const queryBuilder = (
  studentId: string,
  publishedAt: string,
  status: string
) => {
  let query =
    "SELECT a.* FROM assignments a JOIN submissions s ON a.id=s.assignment_id  WHERE s.student_id=? AND a.is_deleted=0";

  const queryParams = [studentId];

  if (publishedAt === "SCHEDULED") {
    query += " AND a.published_at > NOW()";
  } else if (publishedAt === "ONGOING") {
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
