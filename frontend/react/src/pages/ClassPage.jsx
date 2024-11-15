import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    getClassById,
    getClassroomById,
    getUserById,
    getUsersInClass, getUsersOfAttendance,
    getValidRadius,
} from "../services/client.js";
import {useAuth} from "../components/context/AuthContext.jsx";
import AdminAttendancePage from "../components/attendance/instructorAttendance/AdminAttendancePage.jsx";
import UserAttendancePage from "../components/attendance/userAttendance/UserAttendancePage.jsx";
import {Box} from "@chakra-ui/react";
import ClassListWrap from "../components/shared/dashboard/ClassListWrap.jsx";

export default function ClassPage(){
    const [classroom, setClassroom] = useState({});
    const [classObject, setClassObject] = useState({});
    const [professor, setProfessor] = useState({});
    const [usersInClass,setUsersInClass] = useState([]);
    const [validRadius, setValidRadius] = useState(null);

    const { name: orgName, id: classId } = useParams();
    const {fullUser,isAdmin,isUser} = useAuth()

    const tag = `${classId}_${new Date().toISOString().split('T')[0]}`


    const fetchData = async () => {
        getClassById(classId)
            .then((classResponse) =>{
                setClassObject(classResponse.data);

                getUserById(classResponse.data.professorId)
                    .then((professorResponse) =>{
                        setProfessor(professorResponse.data);
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
                getClassroomById(classResponse.data.classroomId)
                    .then((classroomResponse) =>{
                        setClassroom(classroomResponse.data);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err);
            })

        getUsersInClass(classId)
            .then((usersRes)=>{
                setUsersInClass(usersRes.data);

            })
            .catch((err)=> {
                console.log(err)
            })

       getValidRadius(tag)
           .then((classRadius) =>{
               setValidRadius(classRadius.data)
           })
           .catch((err) =>{
               console.log(err)
           })
    };

    useEffect(() => {
        fetchData();
    }, [classId,orgName]);



    const commonProps = {
        classObject,
        classroom,
        professor,
        usersInClass,
        validRadius,
        orgName,
        classId,
        fullUser,
        tag
    };

    return (
        <ClassListWrap>
            {(isAdmin()) ?
                <AdminAttendancePage {...commonProps}/>
                :
                isUser() ? <UserAttendancePage {...commonProps} />
                    : <Box>Error</Box>
            }
        </ClassListWrap>
    )
}
