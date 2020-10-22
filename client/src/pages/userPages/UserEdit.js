import React, {useState, useEffect, useContext} from "react";
import UserForm from "../../components/form/UserForm";
import history, {deleteHandler, isRole} from "../../utils";
import api from "../../api";
import {ContextApp} from "../../reducers";
import {FORM_ERROR} from "final-form";


const UserEdit = ({match}) => {
    const [state, setState] = useState({
        loading: true,
        data: []
    })

    useEffect(()=> {
        api.User.getUser(match.params.id).then(res => setState({
            data: res.data,
            loading: false
        }))
    },[])

    const {store} = useContext(ContextApp);

    const redirect = () =>  history.push('/users')

    const onSubmit = values => {
        return api.User.editUser(match.params.id, values).then(response => {
            if(response.data.error) {
                return { [FORM_ERROR]: 'Username is exists' }
            }
            if(store.role ==='internal_admin') {
                redirect()
            }
        }).catch(function (error) {
            console.log(error);
        });
    }


    return (
        state.loading ?
            <h1 className={'text-center'}>Loading</h1> :
            <UserForm
                title={`Edit user ${state.data.first_name}`}
                onSubmit={onSubmit}
                initialValues={state.data}
                role={store.role}
                deleteHandler={(event) => deleteHandler(event,`/api/deleteuser/${match.params.id}`, redirect)} />
    )
}

export default UserEdit;
