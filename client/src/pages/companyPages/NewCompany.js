import React from "react";
import history from '../../utils'
import CompanyForm from "../../components/form/CompanyForm";
import api from "../../api";

const onSubmit = values => {
    const {
        logo
    } = values;
    api.Company.createCompany(values, logo)
        .then(function (response) {
            api.Company.uploadLogo(logo).then(_ => {
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

