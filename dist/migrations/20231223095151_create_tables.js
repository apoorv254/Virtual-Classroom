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
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable("users", (table) => {
            table.string("id").primary().notNullable();
            table.string("name").notNullable();
            table.string("email").notNullable().unique();
            table.timestamp("created_on").defaultTo(knex.fn.now()).notNullable();
        });
        yield knex.schema.createTable("user_roles", (table) => {
            table.string("id").primary().notNullable();
            table.string("role").notNullable();
            table.unique(["id", "role"]);
        });
        yield knex.schema.createTable("assignments", (table) => {
            table.string("id").primary().notNullable();
            table.string("description").notNullable();
            table.dateTime("published_at").notNullable();
            table.dateTime("deadline_date").notNullable();
            table.string("created_by").references("id").inTable("users");
            table.timestamp("created_on").defaultTo(knex.fn.now()).notNullable();
            table.boolean("is_deleted").defaultTo(0).notNullable();
        });
        yield knex.schema.createTable("submissions", (table) => {
            table.string("id").primary().notNullable();
            table.string("remark");
            table.string("assignment_id").references("id").inTable("assignments");
            table.string("student_id").references("id").inTable("users");
            table.unique(["student_id", "assignment_id"]);
            table
                .enu("status", ["PENDING", "SUBMITTED", "OVERDUE"])
                .defaultTo("PENDING");
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTableIfExists("submissions");
        yield knex.schema.dropTableIfExists("assignments");
        yield knex.schema.dropTableIfExists("user_roles");
        yield knex.schema.dropTableIfExists("users");
    });
}
exports.down = down;
