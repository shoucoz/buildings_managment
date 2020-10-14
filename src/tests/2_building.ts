import defaultUuids from "../../uuid_default";
const request = require("supertest");
const server = require("../app").app;
const app = request(server);

const buildingEndpoints = () => {
    it("POST / createbuilding", async () => {
        const res =  await app.post("/createbuilding").send({
            id: defaultUuids.buildingId,
            name: "building 1",
            address: "address 1",
            country: "country 1",
            locale: "ru",
            companyId: [defaultUuids.companyId],
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("name");
    });
    it("GET / Buildings", async () => {
        const res = await app.get("/buildings");
        expect(res.status).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });
    it("GET / Buildings by id", async () => {
        const res = await app.get(`/buildings/${defaultUuids.buildingId}`);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual("building 1");
        expect(res.body.address).toEqual("address 1");
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });
    it("PUT / Edit Building by id", async () => {
        const res = await app.put(`/editbuilding/${defaultUuids.buildingId}`).send({
            id: defaultUuids.buildingId,
            name: "building 2",
            companyId: [defaultUuids.companyId],
        });
        expect(res.statusCode).toEqual(200);
    });
    it("GET / Company by id (check after edit)", async () => {
        const res = await app.get(`/buildings/${defaultUuids.buildingId}`);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual("building 2");
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });

    it("PUT / Edit Company by id", async () => {
        const res = await app.put(`/editcompany/${defaultUuids.companyId}`).send({
            id: defaultUuids.companyId,
            name: "Company 12",
            logo: "logo2.png",
            buildingId: [defaultUuids.buildingId],
        });
        expect(res.statusCode).toEqual(200);
    });
    it("GET / Company by id (check after edit)", async () => {
        const res = await app.get(`/companies/${defaultUuids.companyId}`);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual("Company 12");
        expect(res.body.logo).toEqual("logo2.png");
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });
};

export default buildingEndpoints;
