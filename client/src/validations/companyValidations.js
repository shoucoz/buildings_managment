export default function buildingValidation(values) {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.logo) {
        errors.logo = 'Required'
    }
    if (values.buildingId && !values.buildingId.length) {
        errors.buildingId = 'Required'
    }
    return errors
}

