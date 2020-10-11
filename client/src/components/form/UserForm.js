import React from "react";
import { Form, Field } from 'react-final-form'
import RenderSelect from "../../components/form/RenderSelect";
import FormInput from "../../components/form/FormInput";
import {userValidation} from "../../validations";

const UserForm = ({title, onSubmit, initialValues, deleteHandler}) => (
    <>
        <h1>{title}</h1>
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={userValidation}
            render={({ handleSubmit, form, submitting, pristine, values, reset }) => (
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
                        <div className={'form-check'}>
                            <Field
                                className='form-check-input' name="building_company" component="input" type="checkbox" />
                            <label className='form-check-label'>Employed</label>
                        </div>
                    </div>
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
                    {
                        values.companyId && values.companyId.length ? (
                            <div className={'form-group'}>
                                <label>Building</label>
                                <Field name="buildingId" >
                                    { ({input, meta}) => {
                                        return (
                                            <RenderSelect
                                                category={'compamy_buildings'}
                                                referenceId={values.companyId}
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
                    <div className="buttons">
                        <button className='btn btn-primary' type="submit">
                            Submit
                        </button>
                        {
                           deleteHandler && ( <button onClick={deleteHandler} className='btn btn-danger'>
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