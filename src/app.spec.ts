import {sequelize} from "../db/models";
import defaultUuids from "../uuid_default";
const server = require("./app").app;
const request = require("supertest");

afterAll(async () => {
    await sequelize.close();
    await server.close();
});

describe("Company Endpoints", () => {
    it("POST /createcompany", async () => {
        const res =  await request(server).post("/createcompany").send({
                id: defaultUuids.companyId,
                name: "Company 1",
                logo: "logo.png",
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("name");
    });

    it("GET / Companies", async () => {
        const res = await request(server).get("/companies");
        expect(res.status).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });
});
