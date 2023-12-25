"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDotEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const loadDotEnv = (nodeEnv = 'dev') => {
    dotenv_1.default.config({ path: path_1.default.resolve(`./configs/.${nodeEnv}.env`) });
    dotenv_1.default.config({ path: path_1.default.resolve('./configs/.env') });
};
exports.loadDotEnv = loadDotEnv;
(0, exports.loadDotEnv)(process.env.NODE_ENV);
const config = {
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: path_1.default.resolve('./migrations')
    },
    seeds: {
        directory: path_1.default.resolve('./seedData')
    }
};
module.exports = config;
