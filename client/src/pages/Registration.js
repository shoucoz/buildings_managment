import React, {useEffect} from "react";
import {Field, Form} from "react-final-form";
import { FORM_ERROR } from 'final-form'
import {registrationValidation} from '../validations/index'
import FormInput from "../components/form/FormInput";
import history, {removeRoleAndToken} from '../utils'
import RenderSelect from "../components/form/RenderSelect";
import api from "../api";
import { v4 as uuidv4 } from 'uuid';
import {roleList} from "../roles";

const onSubmit = values => {
    return api.User.createUser({...values, id: uuidv4()})
        .then(function (response) {
            if(response.data.error) {
                return { [FORM_ERROR]: 'Username is exists' }
            } else {
                history.push('/login')
            }
        })
        .catch(function (error) {
            console.log(error)
            console.log(error);
        });
}


export default function Registration() {
    return (
        <>
            <h1 className={'text-center'}>Registation</h1>
            <Form
                onSubmit={onSubmit}
                validate={registrationValidation}
                render={({ handleSubmit, form, submitting, pristine, values, reset, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            name={'first_name'}
                            label={'First Name'}
                            placeholder={'First Name'}
                            type={"text"}
                        />
                        <div className={'form-group'}>
                            <FormInput
                                name={'last_name'}
                                label={'Last Name'}
                                placeholder={'Last Name'}
                                type={"text"}
                            />
                        </div>
                        <div className={'form-group'}>
                            <FormInput
                                name={'password'}
                                label={'Password'}
                                placeholder={'Password'}
                                type={"text"}
                            />
                        </div>
                        <div className={'form-group'}>
                            <FormInput
                                name={'mail'}
                                label={'Mail'}
                                placeholder={'Mail'}
                                type={"text"}
                            />
                        </div>
                        <div className={'form-group'}>
                            <label>Role</label>
                            <Field name="role">
                                { ({input, meta}) => {
                                    return (
                                        <RenderSelect
                                            input={input}
                                            meta={meta}
                                            data={roleList}
                                            onChange={ (value) => input.onChange(value)}
                                        />
                                    )
                                }}
                            </Field>
                        </div>
                        {
                            (values.role && values.role === 'company_worker') && (
                                <div className={'form-group'}>
                                    <div className={'form-check'}>
                                        <Field
                                            className='form-check-input' name="building_company" component="input" type="checkbox" />
                                        <label className='form-check-label'>Employed</label>
                                    </div>
                                </div>
                            )
                        }
                        {
                            values.role && (values.role === 'company_worker' || values.role === 'company_admin') && (
                                <div className={'form-group'}>
                                    <label>Company</label>
                                    <Field name="companyId">
                                        { ({input, meta}) => {
                                            return (
                                                <RenderSelect
                                                    category={'companies'}
                                                    input={input}
                                                    meta={meta}
                                                    onChange={ (value) => input.onChange(value)}
                                                />
                                            )
                                        }}
                                    </Field>
                                </div>
                            )
                        }
                        {
                            (values.role && (values.role === 'building_manager' || values.role === 'building_admin')) || (values.companyId && values.companyId.length && values.role === 'company_worker') ? (
                                <div className={'form-group'}>
                                    <label>Building</label>
                                    <Field name="buildingId" >
                                        { ({input, meta}) => {
                                            return (
                                                <RenderSelect
                                                    category={ values.role === 'company_worker' ? 'compamy_buildings' : 'buildings'}
                                                    referenceId={values.role === 'company_worker' ? values.companyId : ''}
                                                    input={input}
                                                    meta={meta}
                                                    onChange={ (value) => input.onChange(value)}
                                                />
                                            )
                                        }}
                                    </Field>
                                </div>
                            ) : ''
                        }
                        {submitError && <div className="red-text">{submitError}</div>}
                        <div className="buttons">
                            <button className='btn btn-primary' type="submit">
                                Registration
                            </button>
                            <span onClick={() => history.push('/login')} className='btn btn-primary' type="submit">
                                Login Page
                            </span>
                        </div>
                    </form>
                )}
            />
        </>
    )
}
