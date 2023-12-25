"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const knex_1 = require("knex");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexFile = require('../../knexfile');
exports.db = (0, knex_1.knex)(knexFile);
