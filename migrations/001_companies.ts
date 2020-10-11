import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('companies', (table: any) => {
    table.uuid('id').notNullable().primary();
    table.string('name');
    table.string('logo');
    table.timestamp("created_at").defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('companies')
}
