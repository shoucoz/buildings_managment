import React, {useState, useEffect} from "react";
import {HOST} from "../../confing";
const axios = require('axios');


const RenderBuildingUsers = ({id}) => {
    const [state, setState] = useState([])

    useEffect(() => {
        axios.get(`${HOST}/usersinbuilding/${id}`).then(res => {
            setState(res.data)
        })
    },[])

    return (
        <>
            <h3 className={'text-center'}>Users in Building:</h3>
            <ul>
                {
                    state.length ? state.map(item =><li key={item.id} className={'list-item'}>{item.first_name}, {item.last_name}</li>) : <li  className={'list-item'}>Empty Build</li>
                }
            </ul>
        </>
    )
}

export default RenderBuildingUsers;