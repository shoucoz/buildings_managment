import defaultUuids from "../../uuid_default";
const request = require("supertest");
const server = require("../app").app;
const app = request(server);

const deleteEndpoins = () => {
    it("Delete / User1 by id", async () => {
        const res = await app.delete(`/deleteuser/${defaultUuids.userId}`);
        expect(res.status).toEqual(200);
    });
    it("Delete / User2 by id", async () => {
        const res = await app.delete(`/deleteuser/${defaultUuids.userId2}`);
        expect(res.status).toEqual(200);
    });
    it("Delete / Building by id", async () => {
        const res = await app.delete(`/deletebuilding/${defaultUuids.buildingId}`);
        expect(res.status).toEqual(200);
    });
    it("Delete / Company by id", async () => {
        const res = await app.delete(`/deletecompany/${defaultUuids.buildingId}`);
        expect(res.status).toEqual(200);
    });
};

export default deleteEndpoins;
