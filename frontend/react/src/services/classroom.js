import axios from 'axios';

export const getClassrooms= async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms`)
    }catch (e){
        throw e;
    }
}
export const getClassroom= async (classroomId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms/${classroomId}`)
    }catch (e){
        throw e;
    }
}

export const saveClassroom = async (classroom) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classrooms`,
            classroom
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
            updateRequest
        )
    } catch (e) {
        throw e;
    }
}

export const deleteClassroom = async (classroomId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/classrooms/${classroomId}`
        )
    } catch (e) {
        throw e;
    }
}