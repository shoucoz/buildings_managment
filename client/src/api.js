import {HOST} from "./confing";
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');
const axiosFileupload = require('axios-fileupload');


const User = {
    createUser: values => axios.post(`${HOST}/createuser`, {
        id: uuidv4(),
        ...values
    }),
    getUsers: () => axios.get(`${HOST}/users`),
    getUser: id => axios.get(`${HOST}/users/${id}`),
    editUser: (id, values) =>  axios.put(`${HOST}/useredit/${id}`, values),
    getUsersInBuilding: id => axios.get(`${HOST}/usersinbuilding/${id}`),
    getFilteredUsers: (endpoint, id, search) => axios.get(`${HOST}/${endpoint}/${id}${search}`)
}


const Building = {
    createBuilding: values => axios.post(`${HOST}/createbuilding`, {
        id: uuidv4(),
        ...values
    }),
    getBuildings: () => axios.get(`${HOST}/buildings`),
    getBuilding: id =>  axios.get(`${HOST}/buildings/${id}`),
    editBuilding: (id, values) =>  axios.put(`${HOST}/editbuilding/${id}`, values)
}

const Company = {
    createCompany: (values, logo) => axios.post(`${HOST}/createcompany`, {
        id: uuidv4(),
        ...values,
        logo: logo[0].name,
    }),
    uploadLogo: logo => axiosFileupload(`${HOST}/uploadcompanyimage`, logo[0]),
    getCompanies: () => axios.get(`${HOST}/companies/`),
    getCompany: id =>  axios.get(`${HOST}/companies/${id}`),
    editCompany: (id, values, logo, newlogo) => axios.put(`${HOST}/editcompany/${id}`, {
        ...values,
        logo: newlogo ? logo[0].name : values.logo,
    })
}


export default {
    User,
    Building,
    Company
};
