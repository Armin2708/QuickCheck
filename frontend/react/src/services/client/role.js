import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const updateUserRoles = async (userId,updateRequest) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/role/user/${userId}`,
            updateRequest,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}