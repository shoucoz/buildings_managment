export default function loginValidation(values) {
    const errors = {}
    if (!values.first_name) {
        errors.first_name = 'Required'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    return errors
}

