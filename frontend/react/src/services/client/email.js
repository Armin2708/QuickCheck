import axios from 'axios';

export const verifyEmail = async (emailRequest) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/email/verify`,
            emailRequest
        )
    }catch (e){
        throw e;
    }
}

export const verifyCode = async (verifyCodeRequest) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/email/verify/code`,
            verifyCodeRequest
        )
    }catch (e){
        throw e;
    }
}

export const resetPasswordEmail = async (emailRequest) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/email/reset-password`,
            emailRequest
        )
    }catch (e){
        throw e;
    }
}

export const resetPasswordCode = async (verifyCodeRequest) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/email/reset-password/code`,
            verifyCodeRequest
        )
    }catch (e){
        throw e;
    }
}
