import express from "express";
import { userLogin } from "../../controllers/auth/authController";

const router = express.Router();

router.post("/login", userLogin);

export default router;
