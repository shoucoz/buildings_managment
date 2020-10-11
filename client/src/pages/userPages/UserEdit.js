import React, {useState, useEffect} from "react";
import UserForm from "../../components/form/UserForm";
import {HOST} from "../../confing";
import history, {deleteHandler} from "../../utils";
const axios = require('axios');


const UserEdit = ({match}) => {
    const [state, setState] = useState({
        loading: true,
        data: []
    })

    useEffect(()=> {
        axios.get(`${HOST}/users/${match.params.id}`).then(res => setState({
            data: res.data,
            loading: false
        }))
    },[])

    const redirect = () =>  history.push('/users')

    const onSubmit = values => {
        axios.put(`${HOST}/useredit/${match.params.id}`, values).then(_ => {
            redirect()
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
                deleteHandler={(event) => deleteHandler(event,`${HOST}/userdelete/${match.params.id}`, redirect)} />
    )
}

export default UserEdit;