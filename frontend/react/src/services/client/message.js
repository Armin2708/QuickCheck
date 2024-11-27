import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const getChatMessages = async (chatId) =>{
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/messages/chat/${chatId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const saveChatMessage = async (request) =>{
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/messages`,
            request,
            getAuthConfig(),
        )
    } catch (e) {
        throw e;
    }
}

export const deleteChatMessage = async (messageId) =>{
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/messages/${messageId}`,
            getAuthConfig(),
        )
    } catch (e) {
        throw e;
    }
}
