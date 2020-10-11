import React, {useEffect, useState} from "react";
import CompanyForm from "../../components/form/CompanyForm";
import {HOST} from "../../confing";
import history, {deleteHandler} from '../../utils'
import RenderCompanyUsers from "../../components/company/RenderCompanyUsers";
const axios = require('axios');
const axiosFileupload = require('axios-fileupload');


const EditCompany = ({match, location}) => {

    const [state, setState] = useState({
        loading: true,
        data: {
            buildingId: []
        }
    })

    useEffect(()=> {
        axios.get(`${HOST}/companies/${match.params.id}`).then(res => {
            const data = res.data;
            data.buildingId = data.buildingId.map(item => item.id);
            setState({
                data,
                loading: false
            })
        })
    },[])


    const redirect = () =>  history.push('/companies')

    const onSubmit = (values) => {
        const {
            logo,
            newlogo
        } = values;


        axios.put(`${HOST}/editcompany/${match.params.id}`, {
            ...values,
            logo: newlogo ? logo[0].name : values.logo,
        }).then(_ => {
            if(newlogo) {
                axiosFileupload(`${HOST}/uploadcompanyimage`, logo[0]).then(_ => {
                    redirect()
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                redirect()
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
            deleteHandler={(event) => deleteHandler(event, `${HOST}/deletecompany/${match.params.id}`, redirect)}
        />
            <RenderCompanyUsers match={match} location={location} endpoint={'usersincompany'} title={'company'} />
        </>
    )
}

export default EditCompany;