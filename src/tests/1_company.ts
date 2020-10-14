import defaultUuids from "../../uuid_default";
const request = require("supertest");
const server = require("../app").app;
const app = request(server);

const companyEndpoins = () => {
    it("POST /createcompany", async () => {
        const res =  await app.post("/createcompany").send({
            id: defaultUuids.companyId,
            name: "Company 22",
            logo: "logo.png",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("name");
    });
    it("GET / Companies", async () => {
        const res = await app.get("/companies");
        expect(res.status).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });
    it("GET / Company by id", async () => {
        const res = await app.get(`/companies/${defaultUuids.companyId}`);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual("Company 22");
        expect(res.body.logo).toEqual("logo.png");
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });
};

export default companyEndpoins;
