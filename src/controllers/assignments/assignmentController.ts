import { Response } from "express";
import {
  createAssignmentService,
  deleteAssignmentService,
  getAllAssignmentsAssignedToStudent,
  getAssignmentCreatedByTutorDetails,
  getSubmissionDetails,
  updateAssignmentService,
} from "../../services/assignments/assignmentService";

export const createAssignment = async (req: any, res: Response) => {
  try {
    const userRole = req.user.role;

    if (userRole === "tutor") {
      const { description, deadlineDate, publishedAt, listOfStudents } =
        req.body;
      const tutorId = req.user.id;

      const assignmentId = await createAssignmentService(
        description,
        deadlineDate,
        publishedAt,
        tutorId,
        listOfStudents
      );
      res.json({
        message: "Assignment created successfully",
        id: assignmentId,
      });
    } else {
      res
        .status(403)
        .json({ message: "You are not allowed to create assignment" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected Error Occured" });
  }
};

export const updateAssignment = async (req: any, res: Response) => {
  try {
    const userRole = req.user.role;
    if (userRole === "tutor") {
      const { description, deadlineDate, publishedAt } = req.body;
      const assignmentId = req.params.assignmentId;

      const updateAss = await updateAssignmentService(
        description,
        deadlineDate,
        publishedAt,
        assignmentId
      );
      res.json({
        message: "Assignment updated successfully",
        assignment: updateAss,
      });
    } else {
      res
        .status(403)
        .json({ message: "You are not allowed to update assignment" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected Error Occured" });
  }
};

export const deleteAssignment = async (req: any, res: Response) => {
  try {
    const userRole = req.user.role;

    if (userRole === "tutor") {
      const assignmentId = req.params.assignmentId;
      await deleteAssignmentService(assignmentId);
      res.json({ message: "Assignment deleted successfully" });
    } else {
      res
        .status(403)
        .json({ message: "You are not allowed to delete assignment" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected Error Occured" });
  }
};

export const getAssignmentDetails = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const assignmentId = req.params.assignmentId;

    const finalDetails = await getSubmissionDetails(userId, role, assignmentId);
    res.json(finalDetails);
  } catch (error) {
    res.status(500).json({ message: "Unexpected Error Occured" });
  }
};

export const getAssignmentFeed = async (req: any, res: Response) => {
  try {
    const userRole = req.user?.role;
    const { publishedAt, status } = req.query;
    const userId = req.user.id;

    if (userRole === "tutor") {
      const feedDetails = await getAssignmentCreatedByTutorDetails(
        userId,
        publishedAt
      );
      res.json({ message: "Tutor assignment feed retrieved", feedDetails });
    } else if (userRole === "student") {
      const feedDetails = await getAllAssignmentsAssignedToStudent(
        userId,
        status,
        publishedAt
      );
      res.json({
        message: "Student assignment feed retrieved with filters",
        feedDetails,
      });
    } else {
      res.status(403).json({ message: "Forbidden - Invalid user role" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected Error Occured" });
  }
};
