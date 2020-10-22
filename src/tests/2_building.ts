import defaultUuids from "../../uuid_default";
import {token} from "./1_company";
const request = require("supertest");
const server = require("../app").app;
const app = request(server);

const buildingEndpoints = () => {
    it("POST / createbuilding(without token)", async () => {
        const res =  await app.post("/api/createbuilding").send({
            id: defaultUuids.buildingId,
            name: "building 1",
            address: "address 1",
            country: "country 1",
            locale: "ru",
            companyId: [defaultUuids.companyId],
        });
        expect(res.statusCode).toEqual(401);
    });
    it("GET / Buildings", async () => {
        const res = await app.get("/api/buildings");
        expect(res.status).toEqual(200);
        // expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });

    it("POST / createbuilding(with token)", async () => {
        const res =  await app.post("/api/createbuilding").send({
            id: defaultUuids.buildingId,
            name: "building 1",
            address: "address 1",
            country: "country 1",
            locale: "ru",
            companyId: [defaultUuids.companyId],
        }).set("Authorization", token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("name");
    });

    it("GET / Buildings by id", async () => {
        const res = await app.get(`/api/buildings/${defaultUuids.buildingId}`).set("Authorization", token);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual("building 1");
        expect(res.body.address).toEqual("address 1");
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });
    it("PUT / Edit Building by id", async () => {
        const res = await app.put(`/api/editbuilding/${defaultUuids.buildingId}`).send({
            id: defaultUuids.buildingId,
            name: "building 2",
            companyId: [defaultUuids.companyId],
        }).set("Authorization", token);
        expect(res.statusCode).toEqual(200);
    });
    it("GET / Company by id (check after edit)", async () => {
        const res = await app.get(`/api/buildings/${defaultUuids.buildingId}`).set("Authorization", token);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual("building 2");
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });

    it("PUT / Edit Company by id", async () => {
        const res = await app.put(`/api/editcompany/${defaultUuids.companyId}`).send({
            id: defaultUuids.companyId,
            name: "Company 12",
            logo: "logo2.png",
            buildingId: [defaultUuids.buildingId],
        }).set("Authorization", token);
        expect(res.statusCode).toEqual(200);
    });
    it("GET / Company by id (check after edit)", async () => {
        const res = await app.get(`/api/companies/${defaultUuids.companyId}`).set("Authorization", token);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual("Company 12");
        expect(res.body.logo).toEqual("logo2.png");
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });
};

export default buildingEndpoints;
