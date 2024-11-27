import axios from 'axios';

export const getAuthConfig = () => ({
    headers:{
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const login = async (usernameAndPassword) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
            usernameAndPassword
        )
    }catch (e){
        throw e;
    }
}