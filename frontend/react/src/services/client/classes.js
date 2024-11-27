import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const getClasses = async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getOrganizationClasses= async (name) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes/organization/${name}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getClassesOfUserInOrganization= async (userId,orgName) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes/organization/${orgName}/user/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}
export const getClassesOfInstructorInOrganization= async (instructorId,orgName) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes/organization/${orgName}/instructor/${instructorId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getClassById= async (classId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes/id/${classId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const saveClass = async (classObject) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes`,
            classObject,
            getAuthConfig()
        )
    }catch (e){
        throw e;
    }
}

export const updateClass = async (classId, updateRequest) => {
    try {
        console.log(updateRequest)
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes/${classId}`,
            updateRequest,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteClass = async (classId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes/${classId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const joinClass = async (classId,userId) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes/join/${classId}/${userId}`,
            null,
            getAuthConfig()
        )
    }catch (e){
        throw e;
    }
}

export const leaveClass = async (classId,userId) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes/leave/${classId}/${userId}`,
            null,
            getAuthConfig()
        )
    }catch (e){
        throw e;
    }
}


export const uploadClassProfilePicture = async (classId, formData) =>{
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes/${classId}/image`,
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
export const getClassProfilePictureUrl = (classId) => {
    return `${import.meta.env.VITE_API_BASE_URL}/api/classes/${classId}/image`
};


export const searchClassesInOrganization= async (organizationName,search) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes/organization/${organizationName}/search/${search}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

