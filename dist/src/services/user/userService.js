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
exports.getUserByEmailId = exports.registerUserService = void 0;
const uuid_1 = require("uuid");
const userDbClient_1 = require("../../database/user/userDbClient");
const registerUserService = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, uuid_1.v4)();
    userDetails.id = userId;
    yield (0, userDbClient_1.registerUserInDb)(userDetails);
    return userId;
});
exports.registerUserService = registerUserService;
const getUserByEmailId = (emailId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, userDbClient_1.getUserDetailsFromDb)(emailId);
    return response[0][0];
});
exports.getUserByEmailId = getUserByEmailId;
