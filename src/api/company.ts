import {
    createCompany, deleteCompany,
    editCompany,
    getCompanies,
    getCompany,
    getCompanyBuildings,
    uploadLogo,
} from "../../controllers/company";

const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/companies" , getCompanies);

router.get("/companies/:id", passport.authenticate("jwt", {session: false}) , getCompany);

router.get("/compamy_buildings/:companyId", getCompanyBuildings);

router.post("/createcompany", passport.authenticate("jwt", {session: false}) , createCompany);

router.post("/uploadcompanyimage", uploadLogo);

router.put("/editcompany/:companyId", passport.authenticate("jwt", {session: false}) , editCompany);

router.delete("/deletecompany/:id", passport.authenticate("jwt", {session: false}) , deleteCompany);

module.exports = router;
