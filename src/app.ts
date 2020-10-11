import express from "express";
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const api = require("./api");

const app = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

api(app);

// @ts-ignore

const server = app.listen(5000, async function(err: string): void {
    if (err) {
        console.log(err);
    }
    console.log(`Server is watching port 5000`);
});

module.exports.app = server;
