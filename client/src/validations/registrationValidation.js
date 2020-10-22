export default function registrationValidation(values) {
    const errors = {}
    if (!values.first_name) {
        errors.first_name = 'Required'
    }
    if (!values.last_name) {
        errors.last_name = 'Required'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    if (!values.mail) {
        errors.mail = 'Required'
    }
    if(!values.role) {
        errors.role = 'Required'
    }
    if(values.role && (values.role !== 'internal_admin' && values.role !== 'company_admin')) {
        if(!values.buildingId) {
            errors.buildingId = 'Required'
        }
    }
    if(values.role && (values.role == 'company_admin' || values.role == 'company_worker')) {
        if(!values.companyId) {
            errors.companyId = 'Required'
        }
    }
    return errors
}

