import React, {useEffect, useState} from "react";
import history, {deleteHandler} from '../../utils'
import {HOST} from "../../confing";
import BuidlingForm from "../../components/form/BuildingForm";
import RenderBuildingUsers from "../../components/building/RenderBuildingUsers";
const axios = require('axios');



const EditBuilding = ({match}) => {
    const [state, setState] = useState({
        loading: true,
        data: {
            companyId: []
        }
    })

    useEffect(()=> {
        axios.get(`${HOST}/buildings/${match.params.id}`).then(res => {
            const data = res.data;
            data.companyId = data.companyId.map(item => item.id)
            setState({
                data,
                loading: false
            })
        })
    },[])


    const redirect = () =>  history.push('/buildings')

    const onSubmit = values => {
        axios.put(`${HOST}/editbuilding/${match.params.id}`, values).then(_ => {
            redirect()
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
    <BuidlingForm
        title={`Edit building ${state.data.name}`}
        deleteHandler={(event) => deleteHandler(event, `${HOST}/deletebuilding/${match.params.id}`, redirect)}
        onSubmit={onSubmit}
        initialValues={{...state.data}}
/>
    <RenderBuildingUsers id={match.params.id}  />
</>
)}


export default EditBuilding;