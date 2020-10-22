import React, {useEffect, useState, useContext} from "react";
import {ContextApp} from '../../reducers'
import history, {deleteHandler} from '../../utils'
import BuidlingForm from "../../components/form/BuildingForm";
import RenderBuildingUsers from "../../components/building/RenderBuildingUsers";
import api from "../../api";



const EditBuilding = ({match}) => {
    const [state, setState] = useState({
        loading: true,
        data: {
            companyId: []
        }
    })

    useEffect(()=> {
       api.Building.getBuilding(match.params.id).then(res => {
            const data = res.data;
            data.companyId = data.companyId.map(item => item.id)
            setState({
                data,
                loading: false
            })
        })
    },[])

    const {store} = useContext(ContextApp);

    const redirect = () =>  history.push('/buildings')

    const onSubmit = values => {
        api.Building.editBuilding(match.params.id, values).then(_ => {
            if(store.role === 'internal_admin') {
                history.push('/buildings')
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
    <BuidlingForm
        title={`Edit building ${state.data.name}`}
        deleteHandler={(event) => deleteHandler(event, `/api/deletebuilding/${match.params.id}`, redirect)}
        onSubmit={onSubmit}
        initialValues={{...state.data}}
        role={store.role}
/>
    <RenderBuildingUsers id={match.params.id}  />
</>
)}


export default EditBuilding;
