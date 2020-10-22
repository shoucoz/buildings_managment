import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: any) => {
    table.uuid('id').notNullable().primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('password').notNullable();
    table.string('mail').notNullable();
    table.string('role').notNullable();
    table.boolean('mail_confirmed');
    table.boolean('building_company');
    table.uuid('buildingId').references('id').inTable('buildings');
    table.uuid('companyId').references('id').inTable('companies');
    table.timestamp("created_at").defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
