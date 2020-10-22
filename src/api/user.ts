import {
    createUser,
    deleteUser,
    editUser,
    getFreeUsers,
    getUser,
    getUsers,
    getUsersFromBuilding,
    getUsersFromCompany,
    login,
    mailVerification,
} from "../../controllers/user";

const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/users", passport.authenticate("jwt", {session: false}) , getUsers);

router.get("/freeusers", passport.authenticate("jwt", {session: false}) , getFreeUsers);

router.get("/users/:id", passport.authenticate("jwt", {session: false}) , getUser);

router.post("/createuser" , createUser);

router.put("/useredit/:id", passport.authenticate("jwt", {session: false}) , editUser);

router.delete("/deleteuser/:id", passport.authenticate("jwt", {session: false}) , deleteUser);

router.get("/usersinbuilding/:id", passport.authenticate("jwt", {session: false}) , getUsersFromBuilding);

router.get("/usersincompany/:id", passport.authenticate("jwt", {session: false}) , getUsersFromCompany);

router.post("/login", login);

router.get("/verify/:id", mailVerification);

module.exports = router;
