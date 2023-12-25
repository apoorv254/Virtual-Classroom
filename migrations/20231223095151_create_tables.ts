import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.string("id").primary().notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.timestamp("created_on").defaultTo(knex.fn.now()).notNullable();
  });

  await knex.schema.createTable("user_roles", (table) => {
    table.string("id").primary().notNullable();
    table.string("role").notNullable();
    table.unique(["id", "role"]);
  });

  await knex.schema.createTable("assignments", (table) => {
    table.string("id").primary().notNullable();
    table.string("description").notNullable();
    table.dateTime("published_at").notNullable();
    table.dateTime("deadline_date").notNullable();
    table.string("created_by").references("id").inTable("users");
    table.timestamp("created_on").defaultTo(knex.fn.now()).notNullable();
    table.boolean("is_deleted").defaultTo(0).notNullable()
  });

  await knex.schema.createTable("submissions", (table) => {
    table.string("id").primary().notNullable();
    table.string("remark");
    table.string("assignment_id").references("id").inTable("assignments");
    table.string("student_id").references("id").inTable("users");
    table.unique(["student_id", "assignment_id"]);
    table
      .enu("status", ["PENDING", "SUBMITTED", "OVERDUE"])
      .defaultTo("PENDING");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("submissions");
  await knex.schema.dropTableIfExists("assignments");
  await knex.schema.dropTableIfExists("user_roles");
  await knex.schema.dropTableIfExists("users");
}