import express from "express";
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const api = require("./api");
const passport = require("passport");

const app = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

api(app);

app.use(passport.initialize());
require("../middleware/passport")(passport);

// @ts-ignore
const server = app.listen(5000, async (err: string): void => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is watching port 5000`);
});

module.exports.app = server;
