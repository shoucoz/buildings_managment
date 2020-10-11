import React from "react";
import history from '../../utils'
import { v4 as uuidv4 } from 'uuid';
import {HOST} from "../../confing";
import BuidlingForm from "../../components/form/BuildingForm";
const axios = require('axios');


const onSubmit = values => {
    axios.post(`${HOST}/createbuilding`, {
        id: uuidv4(),
        ...values
    })
        .then(function (response) {
            history.push('/buildings')
        })
        .catch(function (error) {
            console.log(error);
        });
}

const NewBuilding = () => (
    <BuidlingForm
        title={'Create New Building'}
        onSubmit={onSubmit}
        initialValues={{companyId: []}}
    />
)


export default NewBuilding;