import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import RenderList from "../../components/RenderList";
import {HOST} from "../../confing";
import CompanyComponent from "../../components/company/CompanyComponent";
import Loader from "../../components/Loader";
import {builingFilter} from "../../utils";

const axios = require('axios');


const CompaniesList = () => {
    const [state, setState] = useState({
        data: [],
        loading: true
    })

    useEffect(()=> {
        axios.get(`${HOST}/companies`).then(res => setState({
            data: res.data,
            filteredData: res.data,
            loading: false
        }))
    },[])

    return (
        <div>
            <Loader loading={state.loading}>
                <RenderList data={state.data} filterFunction={builingFilter}>
                    <CompanyComponent />
                </RenderList>
                <Link to={'/createcompany'} className={'btn btn-primary'}>Add new company +</Link>
            </Loader>
        </div>
    )
}


export default CompaniesList;