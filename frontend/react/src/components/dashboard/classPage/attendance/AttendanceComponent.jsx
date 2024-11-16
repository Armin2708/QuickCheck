import AdminAttendancePage from "./instructorAttendance/AdminAttendancePage.jsx";
import UserAttendancePage from "./userAttendance/UserAttendancePage.jsx";
import {Box} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {getClassroomById, getUserById, getValidRadius} from "../../../../services/client.js";

export default function AttendanceComponent({fullUser, isAdmin, isUser, tag, classObject, usersInClass}){
    const [classroom, setClassroom] = useState({});
    const [professor, setProfessor] = useState({});
    const [validRadius, setValidRadius] = useState(null);

    const fetchProfessor =() =>{
        getUserById(classObject.professorId)
            .then((professorResponse) =>{
                setProfessor(professorResponse.data);
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    const fetchClassroom =() =>{
        getClassroomById(classObject.classroomId)
            .then((classroomResponse) =>{
                setClassroom(classroomResponse.data);
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const fetchRadius =() =>{
        getValidRadius(tag)
            .then((classRadius) =>{
                setValidRadius(classRadius.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    useEffect(() => {
        fetchProfessor();
        fetchClassroom();
        fetchRadius()
    }, [classObject]);


    return(
        <Box>
            {(fullUser.id===professor.id || isAdmin()) ? (
                <AdminAttendancePage
                    classObject={classObject}
                    classroom={classroom}
                    professor={professor}
                    usersInClass={usersInClass}
                    tag={tag}
                />
            ) : (
                <UserAttendancePage
                    classObject={classObject}
                    classroom={classroom}
                    professor={professor}
                    validRadius={validRadius}
                    fullUser={fullUser}
                    tag={tag}
                />
            )}
        </Box>
    )
}