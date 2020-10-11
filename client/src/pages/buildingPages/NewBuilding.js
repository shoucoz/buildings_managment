import React from "react";
import history from '../../utils'
import BuidlingForm from "../../components/form/BuildingForm";
import api from "../../api";


const onSubmit = values => {
        api.Building.createBuilding(values)
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
