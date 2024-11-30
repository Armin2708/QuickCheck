import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const getClassUserParticipation = async (classId, userId) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/statistic/class/${classId}/user/${userId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getAttendanceParticipation = async (tag) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/statistic/attendance/${tag}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}