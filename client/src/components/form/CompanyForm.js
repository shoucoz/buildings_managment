import React, {useState} from "react";
import { Form, Field } from 'react-final-form'
import RenderSelect from "../../components/form/RenderSelect";
import FormInput from "../../components/form/FormInput";
import {companyValidations} from "../../validations";


const CompanyForm = ({title, onSubmit, initialValues, deleteHandler, role}) => {
    const [hide, toggleVisible] = useState(() => deleteHandler)

    const showFileInput = (clearLogo, setNewLogo) => {
        toggleVisible(false);
        clearLogo()
        setNewLogo()
    }

    return (
    <>
        <h1>{title}</h1>
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            mutators={{
                clearLogo: (args, state, utils) => {
                    utils.changeValue(state, 'logo', () => '')
                },
                setNewLogo: (args, state, utils) => {
                    utils.changeValue(state, 'newlogo', () => true)
                },

            }}
            validate={companyValidations}
            render={({ handleSubmit, form, submitting, pristine, values, reset }) => (
                <form onSubmit={handleSubmit}>
                    <FormInput
                        name={'name'}
                        label={'Company Name'}
                        placeholder={'Company Name'}
                        type={"text"}
                    />

                    { hide ?
                        <span>
                            <strong onClick={() => showFileInput(form.mutators.clearLogo, form.mutators.setNewLogo)}>
                                Change Logo
                            </strong>
                        </span>
                        :
                        ( <div className={'form-group'}>
                        <label className={'form-label'}>Logo</label>
                        <Field name={'logo'}>
                            {({input: {value, onChange, ...input}, meta}) => {
                                const handleChange = ({target}) => {
                                    onChange(target.files)
                                }
                                return (
                                    <>
                                        <input className={'form-control'}  {...input} type="file"
                                               onChange={handleChange}/>
                                        {meta && meta.touched && meta.error ?
                                            <p className={'red-text'}>{meta.error}</p> : ''}
                                    </>
                                )
                            }}
                        </Field>
                    </div>)
                    }

                    <div className={'form-group'}>
                        <label>Building</label>
                        <Field name="buildingId" type='select'>
                            { ({input, meta}) => {
                                return (
                                    <RenderSelect
                                        category={'buildings'}
                                        input={input}
                                        meta={meta}
                                        multiple
                                        onChange={ (value) => input.onChange(value)}
                                    />
                                )
                            }}
                        </Field>
                    </div>

                    <div className="buttons">
                        <button className='btn btn-primary' type="submit">
                            Submit
                        </button>
                        {
                           deleteHandler && role === 'internal_admin' && ( <button onClick={deleteHandler} className='btn btn-danger'>
                                Delete
                            </button> )
                        }
                    </div>
                </form>
            )}
        />
    </>
)
    }


export default CompanyForm;
