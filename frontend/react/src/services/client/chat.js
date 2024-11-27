import axios from "axios";
import {getAuthConfig} from "./auth.js";

export const getChats = async () =>{
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/chats`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getChat = async (chatId) =>{
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/chats/${chatId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getClassChats = async (classId) =>{
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/chats/class/${classId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const getClassChatsUserJoined = async (classId,userId) =>{
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/chats/class/${classId}/user/${userId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const saveChat = async (request) =>{
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/chats`,
            request,
            getAuthConfig(),
        )
    } catch (e) {
        throw e;
    }
}

export const joinChat = async (chatId,userId) =>{
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/chats/join/${chatId}/${userId}`,
            null,
            getAuthConfig(),
        )
    } catch (e) {
        throw e;
    }
}

export const leaveChat = async (chatId,userId) =>{
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/chats/leave/${chatId}/${userId}`,
            null,
            getAuthConfig(),
        )
    } catch (e) {
        throw e;
    }
}

export const updateChat = async (update,chatId) =>{
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/chats/${chatId}`,
            update,
            getAuthConfig(),
        )
    } catch (e) {
        throw e;
    }
}

export const deleteChat = async (chatId) =>{
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/chats/${chatId}`,
            getAuthConfig(),
        )
    } catch (e) {
        throw e;
    }
}
