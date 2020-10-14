import * as Knex from "knex";
import defaultUuids from "../uuid_default";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("bacs").del();

    // Inserts seed entries
    await knex("bacs").insert([
        {
            buildingId: defaultUuids.buildingId,
            companyId: defaultUuids.companyId
        },
    ]);
};
