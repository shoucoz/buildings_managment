import {sequelize} from "../../db/models";
import companyEndpoins from "./1_company";
import buildingEndpoints from "./2_building";
import companyWithBuildings from "./3_companies_and_building";
import userEndpoints from "./4_user";
import deleteEndpoins from "./5_delete";
const server = require("../app").app;

afterAll(async () => {
    await sequelize.close();
    await server.close();
});

describe("Company Endpoints", companyEndpoins);
describe("Building Endpoints", buildingEndpoints);
describe("Company Endpoints with Buildings", companyWithBuildings);
describe("User Endpoints", userEndpoints);
describe("Delete Endpoints", deleteEndpoins);
