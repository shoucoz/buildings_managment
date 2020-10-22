import defaultUuids from "../../uuid_default";
import {token} from "./1_company";
const request = require("supertest");
const server = require("../app").app;
const app = request(server);

const deleteEndpoins = () => {
    it("Delete / User2 by id (without token)", async () => {
        const res = await app.delete(`/api/deleteuser/${defaultUuids.userId2}`);
        expect(res.status).toEqual(401);
    });
    it("Delete / Building by id (without token)", async () => {
        const res = await app.delete(`/api/deletebuilding/${defaultUuids.buildingId}`);
        expect(res.status).toEqual(401);
    });
    it("Delete / Company by id (without token)", async () => {
        const res = await app.delete(`/api/deletecompany/${defaultUuids.buildingId}`);
        expect(res.status).toEqual(401);
    });
    it("Delete / User2 by id (with token)", async () => {
        const res = await app.delete(`/api/deleteuser/${defaultUuids.userId2}`).set("Authorization", token);
        expect(res.status).toEqual(200);
    });
    it("Delete / Building by id (with token)", async () => {
        const res = await app.delete(`/api/deletebuilding/${defaultUuids.buildingId}`).set("Authorization", token);
        expect(res.status).toEqual(200);
    });
    it("Delete / Company by id (with token)", async () => {
        const res = await app.delete(`/api/deletecompany/${defaultUuids.buildingId}`).set("Authorization", token);
        expect(res.status).toEqual(200);
    });
};

export default deleteEndpoins;
