import {HOST} from "./confing";

const axios = require('axios')

const createHistory =  require("history").createBrowserHistory;
export default createHistory();

export function userFilter(data, value) {
    return data.filter(item => item.first_name.toLowerCase().indexOf(value) > -1 || item.last_name.toLowerCase().indexOf(value) > -1)
}

export function builingFilter(data, value) {
    return data.filter(item => item.name.toLowerCase().indexOf(value) > -1)
}

export function deleteHandler(event, endpoint, redirect) {
    event.preventDefault();
    axios.delete(`${HOST}${endpoint}`)
        .then(_ => {
            redirect()
        })
        .catch(function (error) {
            console.log(error);
        });
}


export function filteredRoutes(role, routes) {
    return routes.filter(item => item.accessRoles.indexOf(role) !== -1)
}

export function isRole(role) {
    return window.localStorage.getItem('role') === role;
}

export function setRoleAndToken(role, token) {
    axios.defaults.headers.common['Authorization'] = token;
    window.localStorage.setItem('role', role)
    window.localStorage.setItem('token', token)
}

export function removeRoleAndToken() {
    window.localStorage.removeItem('role')
    window.localStorage.removeItem('token')
}
