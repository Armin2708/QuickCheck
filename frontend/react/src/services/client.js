import axios from 'axios';

const getAuthConfig = () => ({
    headers:{
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getUsers= async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}
export const getUser= async (userId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`,
            getAuthConfig())
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
            updateRequest,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteUser = async (userId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

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




export const getClassrooms= async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}
export const getClassroom= async (classroomId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms/${classroomId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const saveClassroom = async (classroom) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classrooms`,
            classroom
        )
    }catch (e){
        throw e;
    }
}

export const updateClassroom = async (classroomId, updateRequest) => {
    try {
        console.log(updateRequest)
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/classrooms/${classroomId}`,
            updateRequest,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteClassroom = async (classroomId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/classrooms/${classroomId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const verifyEmail = async (email) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/email/verify?email=${email}`
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