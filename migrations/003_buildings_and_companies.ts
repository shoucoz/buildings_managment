import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('bacs', (table: any) => {
    table.uuid('buildingId').references('id').inTable('buildings');
    table.uuid('companyId').references('id').inTable('companies');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bacs')
}
