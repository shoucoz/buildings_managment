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

router.get("/companies", getCompanies);

router.get("/companies/:id", getCompany);

router.get("/compamy_buildings/:companyId", getCompanyBuildings);

router.post("/createcompany", createCompany);

router.post("/uploadcompanyimage", uploadLogo);

router.put("/editcompany/:companyId", editCompany);

router.delete("/deletecompany/:id", deleteCompany);

module.exports = router;
