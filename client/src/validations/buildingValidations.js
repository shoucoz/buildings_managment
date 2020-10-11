export default function buildingValidation(values) {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.address) {
        errors.address = 'Required'
    }
    if (!values.country) {
        errors.country = 'Required'
    }
    if (!values.locale) {
        errors.locale = 'Required'
    }
    if (values.companyId && !values.companyId.length) {
        errors.companyId = 'Required'
    }
    return errors
}

