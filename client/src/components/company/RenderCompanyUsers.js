import React, {useState, useEffect} from "react";
import {HOST} from "../../confing";
import Paginations from "../Paginations";
import FilterSelect from "../FilterSelect";
const axios = require('axios');


const RenderCompanyUsers= ({match, endpoint, title, location}) => {
    const [state, setState] = useState({
        rows: []
    })

    useEffect(() => {
        axios.get(`${HOST}/${endpoint}/${match.params.id}${location.search}`).then(res => {
            setState(res.data)
        })
    },[match])

    return (
        <>
            <h3 className={'text-center'}>Users in {title}:</h3>
            <div className={'filters-row'}>
                <FilterSelect location={location} queryParam={'order'} options={['asc', 'desc']} {...match}  title={'Filter by'}/>
                <FilterSelect location={location} queryParam={'limit'} options={[2, 5, 10]} {...match}  title={'Display elements'}/>
            </div>
            <ul>
                {
                    state.rows.length ? state.rows.map(item =><li key={item.id} className={'list-item'}>{item.first_name}, {item.last_name}</li>) : <li  className={'list-item'}>Empty {title}</li>
                }
            </ul>
            <Paginations count={state.count} {...match} location={location} />
        </>
    )
}

export default RenderCompanyUsers;