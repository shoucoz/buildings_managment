import React, {useEffect, useState} from "react";
import {HOST} from "../../confing";
const axios = require('axios');


const RenderSelect = ({category, onChange, meta, referenceId, input, multiple, data}) => {
    const [state, setState] = useState([])

    useEffect(() => {
        if(data) {
            setState({data:data})
        } else {
            let url = referenceId ? `${HOST}/api/${category}/${referenceId}` : `${HOST}/api/${category}`;
            axios.get(url).then(res => setState({
                data: res.data,
            }))
        }
    } ,[referenceId])


    return (
        <>
            <select className={'form-control'} {...input} onChange={onChange} multiple={multiple}>
                <option></option>
                {state.data ? state.data.map((option) => <option key={option.id} value={option.id}>{option.name}</option>): ''}
            </select>
                {meta && meta.touched && meta.error ? <p className={'red-text'}>{meta.error}</p> : ''}
                </>
    )
}

export default RenderSelect;
