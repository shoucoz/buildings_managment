export default function buildingsForUserValidation(values) {
    const errors = {}
    if (!values.buildingId) {
        errors.buildingId = 'Required'
    }
    return errors
}

