import {HOST} from "./confing";
import { v4 as uuidv4 } from 'uuid';
import history from './utils'
const axios = require('axios');
const axiosFileupload = require('axios-fileupload');



axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')


axios.interceptors.response.use(null, function (error) {
    if (error.response.status === 401) {
        console.log('Failed to login')
        history.push('/login')
    }
    return Promise.reject(error)
})

const User = {
    createUser: values => axios.post(`${HOST}/api/createuser`, {
        id: uuidv4(),
        ...values
    }),
    login: values => axios.post(`${HOST}/api/login`, {
        ...values
    }),
    getUsers: () => axios.get(`${HOST}/api/users`),
    getFreeUsers: () => axios.get(`${HOST}/api/freeusers`),
    getUser: id => axios.get(`${HOST}/api/users/${id}`),
    editUser: (id, values) =>  axios.put(`${HOST}/api/useredit/${id}`, values),
    getUsersInBuilding: id => axios.get(`${HOST}/api/usersinbuilding/${id}`),
    getFilteredUsers: (endpoint, id, search) => axios.get(`${HOST}/api/${endpoint}/${id}${search}`)
}


const Building = {
    createBuilding: values => axios.post(`${HOST}/api/createbuilding`, {
        id: uuidv4(),
        ...values
    }),
    getBuildings: () => axios.get(`${HOST}/api/buildings`),
    getBuilding: id =>  axios.get(`${HOST}/api/buildings/${id}`),
    editBuilding: (id, values) =>  axios.put(`${HOST}/api/editbuilding/${id}`, values)
}

const Company = {
        createCompany: (values, logo) => axios.post(`${HOST}/api/createcompany`, {
            id: uuidv4(),
            ...values,
            logo: logo[0].name,
        }),
        uploadLogo: logo => axiosFileupload(`${HOST}/api/uploadcompanyimage`, logo[0]),
        getCompanies: () => axios.get(`${HOST}/api/companies/`),
        getCompany: id => axios.get(`${HOST}/api/companies/${id}`),
        editCompany: (id, values, logo, newlogo) => axios.put(`${HOST}/api/editcompany/${id}`, {
            ...values,
            logo: newlogo ? logo[0].name : values.logo,
        })
}

export default {
    User,
    Building,
    Company
};
