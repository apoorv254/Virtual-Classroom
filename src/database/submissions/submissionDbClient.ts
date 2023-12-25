import { db } from "../../lib/db";

export const getOnlyStudentSubmission = async (
  studentId: string,
  assignmentId: string
) => {
  const response = await db.raw(
    "SELECT remark,id,status from submissions WHERE student_id=? AND assignment_id =?;",
    [studentId, assignmentId]
  );
  return response[0][0];
};

export const getAllSubmissionAddedForAssignmentByAssignedStudent = async (
  assignmentId: string
) => {
  const response = await db.raw(
    "SELECT remark,id,student_id,status from submissions WHERE assignment_id=?;",
    [assignmentId]
  );
  return response[0];
};

export const submitAssignmentInDb = async (
  submissionDetails: any
): Promise<any> => {
  try {
    const response = await db.raw(
      " UPDATE submissions SET remark=? ,status=? WHERE assignment_id=? AND student_id=?",
      [
        submissionDetails.submissionRemark,
        "SUBMITTED",
        submissionDetails.asssignmentId,
        submissionDetails.studentId,
      ]
    );

    return response;
  } catch (error) {
    throw new Error("Failed to submit assignment sql");
  }
};
