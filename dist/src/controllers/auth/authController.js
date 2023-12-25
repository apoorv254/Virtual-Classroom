"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("../../services/user/userService");
const SECRET_TOKEN = process.env.SECRET_TOKEN ||
    "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const roleOfUser = yield (0, userService_1.getUserByEmailId)(email);
        const token = jsonwebtoken_1.default.sign(roleOfUser, SECRET_TOKEN, {
            expiresIn: "1h",
        });
        res.json({ token });
    }
    catch (error) {
        console.log(error, "erro");
        res.status(500).json({ message: "Unexpected Error Occured" });
    }
});
exports.userLogin = userLogin;
