import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: any) => {
    table.uuid('id').notNullable().primary();
    table.string('first_name');
    table.string('last_name');
    table.boolean('building_company');
    table.uuid('buildingId').references('id').inTable('buildings');
    table.uuid('companyId').references('id').inTable('companies');
    table.timestamp("created_at").defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
