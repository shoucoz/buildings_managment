import React from "react";
import history from '../../utils'
import { v4 as uuidv4 } from 'uuid';
import {HOST} from "../../confing";
import UserForm from "../../components/form/UserForm";
const axios = require('axios');


const onSubmit = values => {
    axios.post(`${HOST}/createuser`, {
        id: uuidv4(),
        ...values
    })
        .then(function (response) {
            history.push('/users')
        })
        .catch(function (error) {
            console.log(error);
        });
}

const NewUser = () => (
    <UserForm
        title={'Create New User'}
        onSubmit={onSubmit}
        initialValues={{building_company: true}}
    />
)


export default NewUser;