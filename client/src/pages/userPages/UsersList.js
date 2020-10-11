import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import RenderList from "../../components/RenderList";
import {HOST} from "../../confing";
import UserComponent from "../../components/user/UserComponent";
import Loader from "../../components/Loader";
import {userFilter} from "../../utils";

const axios = require('axios');


const UsersList = () => {
    const [state, setState] = useState({
        data: [],
        loading: true
    })

    useEffect(()=> {
        axios.get(`${HOST}/users`).then(res => setState({
            data: res.data,
            filteredData: res.data,
            loading: false
        }))
    },[])

    return (
        <div>
            <Loader loading={state.loading}>
                <RenderList data={state.data} filterFunction={userFilter}>
                    <UserComponent />
                </RenderList>
                <Link to={'/createuser'} className={'btn btn-primary'}>Add new user +</Link>
            </Loader>
        </div>
    )
}


export default UsersList;