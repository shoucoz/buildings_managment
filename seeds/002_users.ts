import * as Knex from "knex";
import defaultUuids from "../uuid_default";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            id: defaultUuids.userId,
            first_name: "Yuriy",
            last_name: "Gagarin",
            building_company: true,
            role: "internal_admin",
            mail: "mail@mail.com",
            mail_confirmed: true,
            buildingId: defaultUuids.buildingId,
            companyId: defaultUuids.companyId
        },
    ]);
};

