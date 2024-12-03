import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const getUserEvents = async (userId) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/calendar/user/${userId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getUserClassesEvents = async (userId) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/calendar/classes/user/${userId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getClassEvents = async (classId) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/calendar/class/${classId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const saveEvent = async (event) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/calendar`,
            event,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const updateEvent = async (eventId,update) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/calendar/${eventId}`,
            update,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
export const deleteEvent = async (eventId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/calendar/${eventId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}