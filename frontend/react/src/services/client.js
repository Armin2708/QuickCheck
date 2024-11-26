import axios from 'axios';

const getAuthConfig = () => ({
    headers:{
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const login = async (usernameAndPassword) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
            usernameAndPassword
        )
    }catch (e){
        throw e;
    }
}

export const verifyEmail = async (emailRequest) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/email/verify`,
            emailRequest
        )
    }catch (e){
        throw e;
    }
}

export const verifyCode = async (verifyCodeRequest) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/email/verify/code`,
            verifyCodeRequest
        )
    }catch (e){
        throw e;
    }
}



//User

export const getUsers= async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const searchUsers= async (search) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/search/${search}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getUserById= async (userId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/id/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getUserByEmail= async (email) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/email/${email}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getUsersInClass= async (classId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/class/${classId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getChatMembers= async (chatId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/chat/${chatId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const saveUser = async (user) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/users`,
            user
        )
    }catch (e){
        throw e;
    }
}

export const isUserInAttendance = async (tag, userId) =>{
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/attendance/${tag}/user/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}
export const isUserInOrganization = async (name, userId) =>{
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/organization/${name}/user/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}
export const isUserInClass = async (classId, userId) =>{
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/class/${classId}/user/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const isUserInChat = async (chatId, userId) =>{
    try{
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/chat/${chatId}/user/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const updateUser = async (userId, updateRequest) => {
    try {
        console.log(updateRequest)
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`,
            updateRequest,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const updateUserRoles = async (userId, updateRequest) => {
    try {
        console.log(updateRequest)
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/roles/${userId}`,
            updateRequest,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteUser = async (userId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}



//Organization

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



//Classroom

export const getClassrooms= async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getClassroomByName= async (classroomName) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms/name/${classroomName}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getClassroomById= async (classroomId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classrooms/id/${classroomId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const saveClassroom = async (classroom) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classrooms`,
            classroom,
            getAuthConfig()
        )
    }catch (e){
        throw e;
    }
}

export const joinClass = async (classId,userId) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes/join/${classId}/${userId}`,
            null,
            getAuthConfig()
        )
    }catch (e){
        throw e;
    }
}

export const leaveClass = async (classId,userId) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes/leave/${classId}/${userId}`,
            null,
            getAuthConfig()
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
            updateRequest,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteClassroom = async (classroomId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/classrooms/${classroomId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}



//Class

export const getClasses= async () => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getOrganizationClasses= async (name) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes/organization/${name}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getClassesOfUserInOrganization= async (userId,orgName) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes/organization/${orgName}/user/${userId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}
export const getClassesOfInstructorInOrganization= async (instructorId,orgName) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes/organization/${orgName}/instructor/${instructorId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const getClassById= async (classId) => {
    try {
        return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes/id/${classId}`,
            getAuthConfig())
    }catch (e){
        throw e;
    }
}

export const saveClass = async (classObject) => {
    try{
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes`,
            classObject,
            getAuthConfig()
        )
    }catch (e){
        throw e;
    }
}

export const updateClass = async (classId, updateRequest) => {
    try {
        console.log(updateRequest)
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes/${classId}`,
            updateRequest,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const deleteClass = async (classId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes/${classId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}


/*ATTENDANCE*/

export const getUsersOfAttendance = async (tag) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/attendance/${tag}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

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

export const uploadUserProfilePicture = async (userId, formData) =>{
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}/profile-image`,
            formData,
            {
                ...getAuthConfig(),
                'Content-Type' : 'multipart/form-data'

            }
        );
    } catch (e) {
        throw e;
    }
}
export const getUserProfilePictureUrl = (userId) => {
        return `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}/profile-image`
};

export const uploadClassProfilePicture = async (classId, formData) =>{
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/classes/${classId}/image`,
            formData,
            {
                ...getAuthConfig(),
                'Content-Type' : 'multipart/form-data'

            }
        );
    } catch (e) {
        throw e;
    }
}
export const getClassProfilePictureUrl = (classId) => {
        return `${import.meta.env.VITE_API_BASE_URL}/api/classes/${classId}/image`
};


//Chats

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

//Chat Messages

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

//Organization Join

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