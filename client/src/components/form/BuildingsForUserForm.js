import React from "react";
import { Form, Field } from 'react-final-form'
import RenderSelect from "../../components/form/RenderSelect";
import {buildingsForUserValidation} from "../../validations";

const BuildingsForUserForm = ({onSubmit, initialValues}) => (
    <>
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={buildingsForUserValidation}
            render={({ handleSubmit, form, submitting, pristine, values, reset }) => (
                <form className={'d-flex list-item-between'} onSubmit={handleSubmit}>
                    <div className={'form-group'}>
                        <Field name="buildingId">
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
                    <div className="buttons">
                        <button className='btn btn-success' type="submit">
                            Apply
                        </button>
                    </div>
                </form>
            )}
        />
    </>
)


export default BuildingsForUserForm;
