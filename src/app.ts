import express from 'express';
import {getUser, getUsers, createUser, editUser, deleteUser, getUsersFromBuilding, getUsersFromCompany} from "../controllers/user";
import {getCompanies, getCompany, createCompany, deleteCompany, editCompany, getCompanyBuildings, uploadLogo} from "../controllers/company";
import {getBuilding, createBuilding, deleteBuilding, editBuilding, getBuildings} from "../controllers/building";

const bodyParser = require("body-parser");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

app.get('/users', getUsers)

app.get('/users/:id', getUser)

app.post('/createuser', createUser)

app.put('/useredit/:id', editUser)

app.delete('/userdelete/:id', deleteUser)

app.get('/buildings', getBuildings)

app.get('/buildings/:id', getBuilding)

app.put('/editbuilding/:id', editBuilding)

app.post('/createbuilding', createBuilding)

app.delete('/deletebuilding/:id', deleteBuilding)

app.get('/usersinbuilding/:id', getUsersFromBuilding)

app.get('/companies', getCompanies)

app.get('/companies/:id', getCompany)

app.get('/compamy_buildings/:companyId', getCompanyBuildings)

app.post('/createcompany', createCompany)

app.post('/uploadcompanyimage', uploadLogo)

app.put('/editcompany/:companyId', editCompany)

app.get('/companies/:id', getCompany)

app.delete('/deletecompany/:id', deleteCompany)

app.get('/usersincompany/:id', getUsersFromCompany)


// @ts-ignore

app.listen(5000, function (err: string): void {
    if(err) {
        return console.log(err)
    }
    return console.log(`Server is watching port 5000`)
})
