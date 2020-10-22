import React, {useContext, useEffect, useState} from "react";
import CompanyForm from "../../components/form/CompanyForm";
import history, {deleteHandler} from '../../utils'
import CompanyTabs from "../../components/CompanyTabs";
import api from "../../api";
import {ContextApp} from "../../reducers";


const EditCompany = ({match, location}) => {

    const [state, setState] = useState({
        loading: true,
        data: {
            buildingId: [],
            buildingList: []
        }
    })

    useEffect(()=> {
        api.Company.getCompany(match.params.id).then(res => {
            const data = res.data;
            data.buildingList = data.buildingId;
            data.buildingId = data.buildingId.map(item => item.id);
            setState({
                data,
                loading: false
            })
        })
    },[])

    const {store} = useContext(ContextApp);

    const redirect = () =>  history.push('/companies')

    const onSubmit = (values) => {
        const {
            logo,
            newlogo
        } = values;

        api.Company.editCompany(match.params.id, values, logo, newlogo)
        .then(_ => {
            if(newlogo) {
                api.Company.uploadLogo(logo).then(_ => {
                    if(store.role === 'internal_admin') {
                        redirect()
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                if(store.role === 'internal_admin') {
                    redirect()
                }
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
        <CompanyForm
            title={'Edit Company'}
            onSubmit={onSubmit}
            initialValues={state.data}
            role={store.role}
            deleteHandler={(event) => deleteHandler(event, `/api/deletecompany/${match.params.id}`, redirect)}
        />
            <CompanyTabs match={match} location={location} />
        </>
    )
}

export default EditCompany;
