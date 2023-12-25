"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET ||
    "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";
const authenticateJwt = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - Token missing" });
        }
        jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden - Invalid token" });
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(500).json({ hii: "some Error Occured" });
    }
};
exports.authenticateJwt = authenticateJwt;
