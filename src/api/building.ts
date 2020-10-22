import {createBuilding, deleteBuilding, editBuilding, getBuilding, getBuildings} from "../../controllers/building";

const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/buildings" , getBuildings);

router.get("/buildings/:id", passport.authenticate("jwt", {session: false}) , getBuilding);

router.put("/editbuilding/:id", passport.authenticate("jwt", {session: false}) , editBuilding);

router.post("/createbuilding", passport.authenticate("jwt", {session: false}) , createBuilding);

router.delete("/deletebuilding/:id", passport.authenticate("jwt", {session: false}) , deleteBuilding);

module.exports = router;
