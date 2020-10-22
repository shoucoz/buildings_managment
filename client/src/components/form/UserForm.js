import React from "react";
import { Form, Field } from 'react-final-form'
import RenderSelect from "../../components/form/RenderSelect";
import FormInput from "../../components/form/FormInput";
import {registrationValidation} from "../../validations";
import {roleList} from "../../roles";

const UserForm = ({title, onSubmit, initialValues, deleteHandler, role}) => (
    <>
        <h1>{title}</h1>
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
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
                            name={'mail'}
                            label={'Mail'}
                            placeholder={'Mail'}
                            type={"text"}
                        />
                    </div>
                    { role === 'internal_admin' && (<><div className={'form-group'}>
                        <FormInput
                            name={'password'}
                            label={'Password'}
                            placeholder={'Password'}
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
                    </>)}
                    {submitError && <div className="red-text">{submitError}</div>}
                         <div className="buttons">
                            <button className='btn btn-primary' type="submit">
                                Submit
                            </button>
                        {
                            role ==='internal_admin' && deleteHandler && ( <button onClick={deleteHandler} className='btn btn-danger'>
                            Delete
                            </button> )
                        }
                         </div>
                </form>
            )}
        />
    </>
)

export default UserForm;
