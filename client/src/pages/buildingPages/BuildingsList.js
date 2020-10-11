import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import RenderList from "../../components/RenderList";
import BuildingComponent from "../../components/building/BuildingsComponent";
import Loader from "../../components/Loader";
import {builingFilter} from "../../utils";
import api from "../../api";

const BuildingList = () => {
    const [state, setState] = useState({
        data: [],
        loading: true
    })

    useEffect(()=> {
        api.Building.getBuildings().then(res => setState({
            data: res.data,
            loading: false
        }))
    },[])

    return (
        <div>
            <Loader loading={state.loading}>
                <RenderList data={state.data} filterFunction={builingFilter}>
                    <BuildingComponent />
                </RenderList>
                <Link to={'/createbuilding'} className={'btn btn-primary'}>Add new building +</Link>
            </Loader>
        </div>
    )
}

export default BuildingList;
