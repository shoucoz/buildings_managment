import React, {useContext} from "react";
import history from '../../utils'
import UserForm from "../../components/form/UserForm";
import api from "../../api";
import {FORM_ERROR} from "final-form";
import {ContextApp} from "../../reducers";



const onSubmit = values => {
    return api.User.createUser(values)
        .then(function (response) {
            if(response.data.error) {
                return { [FORM_ERROR]: 'Username is exists' }
            } else {
                history.push('/users')
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

const NewUser = () =>  {
    const {store} = useContext(ContextApp);
    return (
        <UserForm
            title={'Create New User'}
            role={store.role}
            onSubmit={onSubmit}
            initialValues={{building_company: true}}
        />
    )
}


export default NewUser;
