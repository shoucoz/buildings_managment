import React from "react";
import { Form, Field } from 'react-final-form'
import RenderSelect from "../../components/form/RenderSelect";
import FormInput from "../../components/form/FormInput";
import {buildingValidation} from "../../validations";

const BuidlingForm = ({title, onSubmit, initialValues, deleteHandler, role}) => (
    <>
        <h1>{title}</h1>
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={buildingValidation}
            render={({ handleSubmit, form, submitting, pristine, values, reset }) => (
                <form onSubmit={handleSubmit}>
                    <FormInput
                        name={'name'}
                        label={'Building Name'}
                        placeholder={'Building Name'}
                        type={"text"}
                    />
                    <div className={'form-group'}>
                        <FormInput
                            name={'address'}
                            label={'Address'}
                            placeholder={'Address'}
                            type={"text"}
                        />
                    </div>
                    <div className={'form-group'}>
                        <FormInput
                            name={'country'}
                            label={'Country'}
                            placeholder={'Country'}
                            type={"text"}
                        />
                    </div>
                    <div className={'form-group'}>
                        <FormInput
                            name={'locale'}
                            label={'Locale'}
                            placeholder={'Locale'}
                            type={"text"}
                        />
                    </div>
                    {
                       role !== 'building_manager' && (<div className={'form-group'}>
                            <label>Companies in Building</label>
                            <Field name="companyId" type='select'>
                                { ({input, meta}) => {
                                    return (
                                        <RenderSelect
                                            category={'companies'}
                                            input={input}
                                            meta={meta}
                                            multiple
                                            onChange={ (value) => input.onChange(value)}
                                        />
                                    )
                                }}
                            </Field>
                        </div>)
                    }

                    <div className="buttons">
                        <button className='btn btn-primary' type="submit">
                            Submit
                        </button>
                        {
                            (deleteHandler && role ==='internal_admin') && ( <button onClick={deleteHandler} className='btn btn-danger'>
                                Delete
                            </button> )
                        }
                    </div>
                </form>
            )}
        />
    </>
)


export default BuidlingForm;
