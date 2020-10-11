import React, {useState, useEffect} from "react";
import UserForm from "../../components/form/UserForm";
import history, {deleteHandler} from "../../utils";
import api from "../../api";


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

    const redirect = () =>  history.push('/users')

    const onSubmit = values => {
        api.User.editUser(match.params.id, values).then(_ => {
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
                deleteHandler={(event) => deleteHandler(event,`/userdelete/${match.params.id}`, redirect)} />
    )
}

export default UserEdit;
