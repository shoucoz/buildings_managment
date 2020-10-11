import React from "react";
import {Field} from "react-final-form";

const FormInput = ({name, type, placeholder, label}) => {
    return (
        <Field name={name}>
            {({ input, meta }) => (
                <div className={'form-group'}>
                    <label className={'form-label'}>{label}</label>
                    <input {...input} type={type} className="form-control" placeholder={placeholder} />
                    {meta.touched && meta.error ? <p className={'red-text'}>{meta.error}</p> : ''}
                </div>
            )}
        </Field>
    )
}

export default FormInput;