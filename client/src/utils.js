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

//
// export function accessForUser(accessUsers) {
//     const currentUser = window.localStorage.getItem('user')
// }
