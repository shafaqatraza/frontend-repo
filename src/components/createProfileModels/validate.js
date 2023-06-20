const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'user name is Required'
    }

    return errors
}
export default validate
