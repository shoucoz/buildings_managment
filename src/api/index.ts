const userApi = require("./user");
const buildingApi = require("./building");
const company = require("./company");

function api(server: any) {
    server.use("/api", userApi);
    server.use("/api", buildingApi);
    server.use("/api", company);
}

module.exports = api;
