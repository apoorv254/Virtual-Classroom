import { Response } from "express";
import { submitAssignment } from "../../services/submissions/submissionService";

export const addSubmission = async (req: any, res: Response) => {
  try {
    const role = req.user.role;

    if (role === "student") {
      const studentId = req.user.id;
      const assignmentId = req.body.assignmentId;
      const submissionRemark = req.body.remark;
      const submissionId = await submitAssignment(
        assignmentId,
        submissionRemark,
        studentId
      );
      res.json({ message: "Submission added successfully", id: submissionId });
    } else {
      res
        .status(401)
        .json({ message: "You are Not allowed to submit the assignment" });
    }
  } catch (error) {
    res.status(500).json({ message: "some Error Occured" });
  }
};
