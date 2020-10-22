import defaultUuids from "../../uuid_default";
const request = require("supertest");
const server = require("../app").app;
const app = request(server);

export let token = "";

const companyEndpoins = () => {
    it("POST / createuser", async () => {
        const res =  await app.post("/api/createuser").send({
            id: defaultUuids.userId,
            first_name: "user name",
            last_name: "user lastname",
            password: "admin",
            mail: "mail@mail.com",
            role: "internal_admin",
            mail_confirmed: true,
            building_company:  true,
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("first_name");
    });

    it("GET / Companies(without token)", async () => {
        const res = await app.get("/api/companies");
        expect(res.status).toEqual(200);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });

    it("POST / Login", async () => {
        const res =  await app.post("/api/login").send({
            first_name: "user name",
            password: "admin",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.user).toHaveProperty("first_name");
        expect(res.body.token.length).toBeGreaterThanOrEqual(10);
        token = res.body.token;
    });

    it("POST /createcompany (without token)", async () => {
        const res =  await app.post("/api/createcompany").send({
            id: defaultUuids.companyId,
            name: "Company 22",
            logo: "logo.png",
        });
        expect(res.statusCode).toEqual(401);
    });

    it("POST /createcompany (with token)", async () => {
        const res =  await app.post("/api/createcompany").send({
            id: defaultUuids.companyId,
            name: "Company 22",
            logo: "logo.png",
        }).set("Authorization", token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("name");
    });

    it("GET / Companies", async () => {
        const res = await app.get("/api/companies");
        expect(res.status).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });

    it("GET / Company by id", async () => {
        const res = await app.get(`/api/companies/${defaultUuids.companyId}`).set("Authorization", token);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual("Company 22");
        expect(res.body.logo).toEqual("logo.png");
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });
};

export default companyEndpoins;
