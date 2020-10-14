import * as Knex from "knex";
import defaultUuids from "../uuid_default";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("companies").del();

    // Inserts seed entries
    await knex("companies").insert([
        {
            id: defaultUuids.companyId,
            name: "Company name 1",
            logo: "logo address 1",
        }
    ]);
};

