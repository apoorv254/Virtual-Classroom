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
exports.getUserDetailsFromDb = exports.registerUserInDb = void 0;
const db_1 = require("../../lib/db");
const registerUserInDb = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.raw("INSERT INTO users (id, name, email) VALUES (?, ?, ?)", [userDetails.id, userDetails.name, userDetails.email]);
        yield db_1.db.raw("INSERT into user_roles (id,role) VALUES(?,?)", [
            userDetails.id,
            userDetails.role,
        ]);
        return "";
    }
    catch (error) {
        console.error("Error updating user details with raw SQL:", error);
        throw new Error("Failed to update user details with raw SQL");
    }
});
exports.registerUserInDb = registerUserInDb;
const getUserDetailsFromDb = (emailId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.db.raw("SELECT user_roles.role,user_roles.id from user_roles JOIN users ON users.id=user_roles.id WHERE email=? ", [emailId]);
    return response;
});
exports.getUserDetailsFromDb = getUserDetailsFromDb;
