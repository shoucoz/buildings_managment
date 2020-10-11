import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('buildings', (table: any) => {
    table.uuid('id').notNullable().primary();
    table.string('name');
    table.string('address');
    table.string('country');
    table.string('locale');
    table.timestamp("created_at").defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('buildings')
}
