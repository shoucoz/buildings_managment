import {createBuilding, deleteBuilding, editBuilding, getBuilding, getBuildings} from "../../controllers/building";

const express = require("express");
const router = express.Router();

router.get("/buildings", getBuildings);

router.get("/buildings/:id", getBuilding);

router.put("/editbuilding/:id", editBuilding);

router.post("/createbuilding", createBuilding);

router.delete("/deletebuilding/:id", deleteBuilding);

module.exports = router;
