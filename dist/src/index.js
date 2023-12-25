"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes/authRoutes"));
const submissionRouter_1 = __importDefault(require("./routes/submissions/submissionRouter"));
const assignmentRoutes_1 = __importDefault(require("./routes/assignments/assignmentRoutes"));
const userRouter_1 = __importDefault(require("./routes/user/userRouter"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(userRouter_1.default);
app.use(authRoutes_1.default);
app.use(assignmentRoutes_1.default);
app.use(submissionRouter_1.default);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
