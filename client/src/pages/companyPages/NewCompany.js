import React from "react";
import history from '../../utils'
import { v4 as uuidv4 } from 'uuid';
import {HOST} from "../../confing";
import CompanyForm from "../../components/form/CompanyForm";
const axios = require('axios');
const axiosFileupload = require('axios-fileupload');


const onSubmit = values => {
    const {
        logo
    } = values;

    axios.post(`${HOST}/createcompany`, {
        id: uuidv4(),
        ...values,
        logo: logo[0].name,
    })
        .then(function (response) {
            axiosFileupload(`${HOST}/uploadcompanyimage`, logo[0]).then(_ => {
                history.push('/companies')
            }).catch(function (error) {
                console.log(error);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

const NewCompany = () => (
    <CompanyForm
        title={'Create New Company'}
        onSubmit={onSubmit}
        initialValues={{buildingId: []}}
    />
)


export default NewCompany;

