import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const getClassrooms= async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getOrganizationClassrooms= async (organizationId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms/organization/${organizationId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const searchOrganizationClassrooms= async (organizationId,input) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms/organization/${organizationId}/search/${input}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getClassroomByNameAndOrganization= async (name,organizationId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms/name/${name}/organization/${organizationId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getClassroomById= async (classroomId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms/id/${classroomId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const saveClassroom = async (classroom) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classrooms`,
            classroom,
            getAuthConfig()
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

