const userApi = require("./user");
const buildingApi = require("./building");
const company = require("./company");

function api(server: any) {
    server.use("/", userApi);
    server.use("/", buildingApi);
    server.use("/", company);
}

module.exports = api;
