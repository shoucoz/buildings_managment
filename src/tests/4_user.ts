import defaultUuids from "../../uuid_default";
const request = require("supertest");
const server = require("../app").app;
const app = request(server);

const userEndpoints = () => {
    it("POST / createuser", async () => {
        const res =  await app.post("/createuser").send({
            id: defaultUuids.userId,
            first_name: "user name",
            last_name: "user lastname",
            building_company:  true,
            buildingId: defaultUuids.buildingId,
            companyId: defaultUuids.companyId,
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("first_name");
    });
    it("GET / Users", async () => {
        const res = await app.get("/users");
        expect(res.status).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });
    it("GET / User by id", async () => {
        const res = await app.get(`/users/${defaultUuids.userId}`);
        expect(res.status).toEqual(200);
        expect(res.body.first_name).toEqual("user name");
        expect(res.body.last_name).toEqual("user lastname");
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });
    it("PUT / Edit User by id", async () => {
        const res = await app.put(`/useredit/${defaultUuids.userId}`).send({
            id: defaultUuids.userId,
            first_name: "user edited",
        });
        expect(res.statusCode).toEqual(200);
    });
    it("GET / User by id (check after edit)", async () => {
        const res = await app.get(`/users/${defaultUuids.userId}`);
        expect(res.status).toEqual(200);
        expect(res.body.first_name).toEqual("user edited");
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    });

    it("GET / Users from building", async () => {
        const res = await app.get(`/usersinbuilding/${defaultUuids.buildingId}`);
        expect(res.body.length).toEqual(1);
    });

    it("POST / one more createuser", async () => {
        const res =  await app.post("/createuser").send({
            id: defaultUuids.userId2,
            first_name: "name2",
            last_name: "user lastname2",
            building_company:  true,
            buildingId: defaultUuids.buildingId,
            companyId: defaultUuids.companyId,
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("first_name");
    });

    it("GET / Sorted users from company with asc order", async () => {
        const res = await app.get(`/usersincompany/${defaultUuids.companyId}?userspage=1&limit=2&order=asc`);
        expect(res.body.count).toEqual(2);
        expect(res.body.rows[0].first_name).toEqual("name2");
    });

    it("PUT / Edit User by id(remove)", async () => {
        const res = await app.put(`/useredit/${defaultUuids.userId}`).send({
            id: defaultUuids.userId,
            building_company:  false,
        });
        expect(res.statusCode).toEqual(200);
    });

    it("GET / users after remove building_company field", async () => {
        const res = await app.get(`/usersincompany/${defaultUuids.companyId}?userspage=1&limit=2&order=asc`);
        expect(res.body.count).toEqual(1);
    });

    it("PUT / Edit User by id(add)", async () => {
        const res = await app.put(`/useredit/${defaultUuids.userId}`).send({
            id: defaultUuids.userId,
            building_company:  true,
        });
        expect(res.statusCode).toEqual(200);
    });

    it("GET / users in company (check pagination first page)", async () => {
        const res = await app.get(`/usersincompany/${defaultUuids.companyId}?userspage=1&limit=1&order=asc`);
        expect(res.body.count).toEqual(2);
        expect(res.body.rows.length).toEqual(1);
    });

    it("GET / users in company (check pagination second page)", async () => {
        const res = await app.get(`/usersincompany/${defaultUuids.companyId}?userspage=2&limit=1&order=asc`);
        expect(res.body.count).toEqual(2);
        expect(res.body.rows.length).toEqual(1);
    });
};

export default userEndpoints;
