import defaultUuids from "../../uuid_default";
const request = require("supertest");
const server = require("../app").app;
const app = request(server);

const companyWithBuildings = () => {
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

    it("GET / Company Buildings", async () => {
        const res = await app.get(`/compamy_buildings/${defaultUuids.companyId}`);
        expect(res.status).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
};

export default companyWithBuildings;
