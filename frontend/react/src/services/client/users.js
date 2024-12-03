import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const getUsers= async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const searchUsers= async (search) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/search/${search}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getUserById= async (userId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/id/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getUserByEmail= async (email) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/email/${email}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getUsersInClass= async (classId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/class/${classId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getChatMembers= async (chatId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/chat/${chatId}`,
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

export const isUserInAttendance = async (tag, userId) =>{
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/attendance/${tag}/user/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}
export const isUserInOrganization = async (name, userId) =>{
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/organization/${name}/user/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}
export const isUserInClass = async (classId, userId) =>{
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/class/${classId}/user/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const isUserInChat = async (chatId, userId) =>{
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/chat/${chatId}/user/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const updateUser = async (userId, updateRequest) => {
    try {
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
export const getUsersOfAttendance = async (tag) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/attendance/${tag}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}


export const uploadUserProfilePicture = async (userId, formData) =>{
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}/profile-image`,
            formData,
            {
                ...getAuthConfig(),
                'Content-Type' : 'multipart/form-data'

            }
        );
    } catch (e) {
        throw e;
    }
}
export const getUserProfilePictureUrl = (userId) => {
    return `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}/profile-image`
};



export const searchUsersInOrganization= async (organizationId,search) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/organization/${organizationId}/search/${search}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getUsersInOrganization= async (organizationId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/organization/${organizationId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const resetPassword = async (updateRequest) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/reset-password`,
            updateRequest
        )
    } catch (e) {
        throw e;
    }
}

export const updateUserAccountType = async (userId,update) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/account-type/${userId}`,
            update,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
