import axios from 'axios';

export const getAdmins= async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admins`)
    }catch (e){
        throw e;
    }
}
export const getAdmin= async (adminId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admins/${adminId}`)
    }catch (e){
        throw e;
    }
}

export const saveAdmin = async (admin) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/admins`,
            admin
        )
    }catch (e){
        throw e;
    }
}

export const updateAdmin = async (adminId, updateRequest) => {
    try {
        console.log(updateRequest)
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/admins/${adminId}`,
            updateRequest
        )
    } catch (e) {
        throw e;
    }
}

export const deleteAdmin = async (adminId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/admins/${adminId}`
        )
    } catch (e) {
        throw e;
    }
}