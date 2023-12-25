import { db } from "../../lib/db";

export const createAssignmentInDb = async (
  assignmentDetails: any,
  submissionDetails: any
): Promise<any> => {
  try {
    await db.raw(
      "INSERT INTO assignments (id, description, published_at,deadline_date,created_by) VALUES (?,?,STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s'),STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s'),?)",
      [
        assignmentDetails.id,
        assignmentDetails.description,
        assignmentDetails.publishedAt,
        assignmentDetails.deadlineDate,
        assignmentDetails.tutorId,
      ]
    );

    await db.raw(
      "INSERT INTO submissions (id, remark, assignment_id,student_id,status) VALUES ?",
      [submissionDetails]
    );

    return "";
  } catch (error) {
    throw new Error("Failed to create assignment");
  }
};

export const updateAssignmentInDb = async (
  assignmentDetails: any,
  assignmentId: string
): Promise<any> => {
  try {
    console.log(assignmentDetails, "assignmentDetails");
    await db.raw(
      "UPDATE assignments SET description=?,published_at=?,deadline_date=? WHERE id=? AND is_deleted=0",
      [
        assignmentDetails.description,
        assignmentDetails.publishedAt,
        assignmentDetails.deadlineDate,
        assignmentId,
      ]
    );

    return "";
  } catch (error) {
    console.error("Error updating user details with raw SQL:", error);
    throw new Error("Failed to update user details with raw SQL");
  }
};

export const getAssignmentCreatedByTutorDetailsFromDb = async (
  tutorId: string
) => {
  const response = await db.raw(
    "SELECT * FROM assignments WHERE created_by=? AND is_deleted=0",
    [tutorId]
  );

  console.log(response, "response");
  return response;
};

export const getScheduledAssignmentCreatedByTutorDetailsFromDb = async (
  tutorId: string
) => {
  const response = await db.raw(
    "SELECT * FROM assignments WHERE created_by=? AND published_at > NOW() AND is_deleted=0; ",
    [tutorId]
  );

  console.log(response, "response");
  return response;
};

export const getOngoingAssignmentCreatedByTutorDetailsFromDb = async (
  tutorId: string
) => {
  const response = await db.raw(
    "SELECT * FROM assignments WHERE created_by=? AND published_at <= NOW() AND is_deleted=0; ",
    [tutorId]
  );

  console.log(response, "response");
  return response;
};

export const getAssignmentsAssignedToStudentFromDb = async (data: any) => {
  try {
    console.log(data.query, "query");
    const response = await db.raw(data.query, data.queryParams);

    console.log(response, "response");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAssignmentDetailsFromDb = async (assignmentId: string) => {
  try {
    const response = await db.raw(
      " UPDATE assignments SET is_deleted=1 WHERE id=?",
      [assignmentId]
    );

    return response;
  } catch (error) {
    console.error("Error updating user details with raw SQL:", error);
    throw new Error("Failed to update user details with raw SQL");
  }
};
