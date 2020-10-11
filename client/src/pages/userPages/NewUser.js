import React from "react";
import history from '../../utils'
import UserForm from "../../components/form/UserForm";
import api from "../../api";



const onSubmit = values => {
    api.User.createUser(values)
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
