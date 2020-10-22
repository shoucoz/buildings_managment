import React, { useContext } from "react";
import {Form} from "react-final-form";
import {FORM_ERROR} from "final-form";
import {loginValidation} from '../validations/index'
import FormInput from "../components/form/FormInput";
import history, { setRoleAndToken } from '../utils'
import api from "../api";
import {ContextApp} from '../reducers'


export default function Login() {
    const {dispatch} = useContext(ContextApp);


    const onSubmit = values => {
        return api.User.login(values).then(response => {
            const {
                data
            } = response
            if(data.error) {
                return { [FORM_ERROR]: data.error }
            } else {
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        role: data.user.role,
                        token: data.user.token
                    }
                })
                setRoleAndToken(data.user.role, data.token)
                if(response && data.user.role === 'internal_admin') {
                    history.push('/')
                }
                if(response && (data.user.role === 'building_admin' || data.user.role === 'building_manager')) {
                    history.push(`/buildings/${data.user.buildingId}`)
                }
                if(response && data.user.role === 'company_admin') {
                    history.push(`/companies/${data.user.companyId}`)
                }
                if(response && data.user.role === 'company_worker') {
                   history.push(`/users/${data.user.id}`)
                }
            }
        })
    }


    return (
        <>
            <h1 className={'text-center'}>Login</h1>
            <Form
                onSubmit={onSubmit}
                validate={loginValidation}
                render={({handleSubmit, form, submitting, pristine, values, reset, submitError}) => (
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            name={'first_name'}
                            label={'First Name'}
                            placeholder={'First Name'}
                            type={"text"}
                        />
                        <div className={'form-group'}>
                            <FormInput
                                name={'password'}
                                label={'Password'}
                                placeholder={'Password'}
                                type={"text"}
                            />
                        </div>
                        {submitError && <div className="red-text">{submitError}</div>}
                        <div className="buttons">
                            <button className='btn btn-primary' type="submit">
                                Login
                            </button>
                            <a className='btn btn-primary' onClick={() => history.push('/registration')}>
                                Registration Page
                            </a>
                        </div>
                    </form>
                )}
            />
        </>
    )
}
