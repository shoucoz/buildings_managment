export default function userValidation(values) {
    const errors = {}
    if (!values.first_name) {
        errors.first_name = 'Required'
    }
    if (!values.last_name) {
        errors.last_name = 'Required'
    }
    // if (!values.buildingId) {
    //     errors.buildingId = 'Required'
    // }
    // if (!values.companyId) {
    //     errors.companyId = 'Required'
    // }
    return errors
}

