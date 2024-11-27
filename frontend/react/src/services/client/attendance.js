import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const getValidRadius = async (tag) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/attendances/radius/${tag}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const verifyAttendance = async (userId,attendanceData) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/attendances/verify/${userId}`,
            attendanceData,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const createAttendance = async (request) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/attendances`,
            request,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
export const openAttendance = async (tag,) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/attendances/open/${tag}`,
            null,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
export const closeAttendance = async (tag) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/attendances/close/${tag}`,
            null,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getAttendance = async (tag) =>{
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/attendances/id/${tag}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getExistAttendance = async (tag) =>{
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/attendances/exist/${tag}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
