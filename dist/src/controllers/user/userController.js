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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const userService_1 = require("../../services/user/userService");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, email, role } = req.body;
        const userDetails = {
            name,
            password,
            email,
            role,
        };
        const userId = yield (0, userService_1.registerUserService)(userDetails);
        res.json({ message: "User Registered successfully", id: userId });
    }
    catch (error) {
        res.status(500).json("some Error occured");
    }
});
exports.registerUser = registerUser;
