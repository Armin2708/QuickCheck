import axios from 'axios';

export const getUsers= async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`)
    }catch (e){
        throw e;
    }
}
export const getUser= async (userId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`)
    }catch (e){
        throw e;
    }
}

export const saveUser = async (user) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/users`,
            user
        )
    }catch (e){
        throw e;
    }
}

export const updateUser = async (userId, updateRequest) => {
    try {
        console.log(updateRequest)
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`,
            updateRequest
        )
    } catch (e) {
        throw e;
    }
}

export const deleteUser = async (userId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`
        )
    } catch (e) {
        throw e;
    }
}