import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const getOrganizations= async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/organizations`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getOrganizationById= async (organizationId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/organizations/id/${organizationId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getOrganizationByName= async (name) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/organizations/name/${name}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getOrganizationsOfUser= async (userId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/organizations/user/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const saveOrganizations = async (organization) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/organizations`,
            organization,
            getAuthConfig()
        )
    }catch (e){
        throw e;
    }
}

export const joinOrganization = async (organizationId,userId) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/organizations/join/${organizationId}/${userId}`,
            null,
            getAuthConfig()
        )
    }catch (e){
        throw e;
    }
}

export const leaveOrganization = async (userId,organizationId) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/organizations/leave/${organizationId}/${userId}`,
            null,
            getAuthConfig()
        )
    }catch (e){
        throw e;
    }
}

export const updateOrganizations = async (organizationsId, updateRequest) => {
    try {
        console.log(updateRequest)
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/${organizationsId}`,
            updateRequest,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteOrganization = async (organizationId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/organizations/${organizationId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

