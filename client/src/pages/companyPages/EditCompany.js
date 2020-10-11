import React, {useEffect, useState} from "react";
import CompanyForm from "../../components/form/CompanyForm";
import history, {deleteHandler} from '../../utils'
import RenderCompanyUsers from "../../components/company/RenderCompanyUsers";
import api from "../../api";


const EditCompany = ({match, location}) => {

    const [state, setState] = useState({
        loading: true,
        data: {
            buildingId: []
        }
    })

    useEffect(()=> {
        api.Company.getCompany(match.params.id).then(res => {
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

        api.Company.editCompany(match.params.id, values, logo, newlogo)
        .then(_ => {
            if(newlogo) {
                api.Company.uploadLogo(logo).then(_ => {
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
            deleteHandler={(event) => deleteHandler(event, `/deletecompany/${match.params.id}`, redirect)}
        />
            <RenderCompanyUsers match={match} location={location} endpoint={'usersincompany'} title={'company'} />
        </>
    )
}

export default EditCompany;
