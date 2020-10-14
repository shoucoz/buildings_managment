import * as Knex from "knex";
import defaultUuids from "../uuid_default";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("buildings").del();

    // Inserts seed entries
    await knex("buildings").insert([
        {
            id: defaultUuids.buildingId,
            name: "Building 1",
            address: "address 1",
            country: 'country 1',
            locale: 'locale 1'
        }
    ]);
};

