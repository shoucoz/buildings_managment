import React, {useContext, useEffect} from "react";
import {ContextApp} from "../reducers";
import history, {removeRoleAndToken} from '../utils'



const LogOut = () => {
    const { dispatch } = useContext(ContextApp);

    const logOut = async () => {
        await dispatch({type: 'LOGOUT'})
        await removeRoleAndToken()
        await history.push('/login')
    }
    return (
        <div className={'navigation'}>
            <span onClick={logOut}>
                Log Out
            </span>
        </div>
    )
}

export default LogOut;

