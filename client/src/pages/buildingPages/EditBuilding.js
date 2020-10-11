import React, {useEffect, useState} from "react";
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


    const redirect = () =>  history.push('/buildings')

    const onSubmit = values => {
        api.Building.editBuilding(match.params.id, values).then(_ => {
            redirect()
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
    <BuidlingForm
        title={`Edit building ${state.data.name}`}
        deleteHandler={(event) => deleteHandler(event, `/deletebuilding/${match.params.id}`, redirect)}
        onSubmit={onSubmit}
        initialValues={{...state.data}}
/>
    <RenderBuildingUsers id={match.params.id}  />
</>
)}


export default EditBuilding;
