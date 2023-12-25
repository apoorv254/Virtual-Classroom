import { submitAssignmentInDb } from "../../database/submissions/submissionDbClient";

export const submitAssignment = async (
  asssignmentId: string,
  submissionRemark: string,
  studentId: string
) => {
  const submissionDetails = {
    asssignmentId,
    submissionRemark,
    studentId,
  };

  const response = await submitAssignmentInDb(submissionDetails);

  return response.id;
};
