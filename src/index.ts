import express from "express";
import authRoutes from "./routes/authRoutes/authRoutes";
import submissionRouter from "./routes/submissions/submissionRouter";
import assignmentRoutes from "./routes/assignments/assignmentRoutes";
import registerRouter from "./routes/user/userRouter";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(registerRouter);
app.use(authRoutes);
app.use(assignmentRoutes);
app.use(submissionRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
