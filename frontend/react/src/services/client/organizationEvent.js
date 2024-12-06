import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const getOrganizationEvents = async (organizationId) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/event/organization/${organizationId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getOrganizationEvent = async (eventId) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/event/${eventId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const saveOrganizationEvent = async (event) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/event`,
            event,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const updateOrganizationEvent = async (eventId,update) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/event/${eventId}`,
            update,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
export const deleteOrganizationEvent = async (eventId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/event/${eventId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}