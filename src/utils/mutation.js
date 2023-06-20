import { useMutation } from 'react-query'



export const registerMutation = () => {
    const mutation = useMutation(formData => {
        return axios.post('https://good-deeds-api.thedemo.co/api/register', formData)
    })

    return mutation;
}