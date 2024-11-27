import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const getOrganizationJoinCode = async (orgJoinCodeId) =>{
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/organization-join-code/${orgJoinCodeId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const createOrganizationJoinCode = async (request) =>{
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/organization-join-code`,
            request,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const verifyOrganizationJoinCode = async (code) =>{
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/organization-join-code/verify/${code}`,
            getAuthConfig(),
        )
    } catch (e) {
        throw e;
    }
}

export const decrementOrganizationJoinCode = async (code) =>{
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/organization-join-code/decrement/${code}`,
            null,
            getAuthConfig(),
        )
    } catch (e) {
        throw e;
    }
}

export const getOrganizationJoinCodes = async (organizationId) =>{
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/organization-join-code/organization/${organizationId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteOrganizationJoinCode = async (codeId) =>{
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/organization-join-code/${codeId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const updateOrganizationJoinCode = async (codeId,update) =>{
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/organization-join-code/${codeId}`,
            update,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
