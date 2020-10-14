import {
    createUser,
    deleteUser,
    editUser,
    getUser,
    getUsers,
    getUsersFromBuilding,
    getUsersFromCompany,
} from "../../controllers/user";

const express = require("express");
const router = express.Router();

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.post("/createuser", createUser);

router.put("/useredit/:id", editUser);

router.delete("/deleteuser/:id", deleteUser);

router.get("/usersinbuilding/:id", getUsersFromBuilding);

router.get("/usersincompany/:id", getUsersFromCompany);

module.exports = router;
