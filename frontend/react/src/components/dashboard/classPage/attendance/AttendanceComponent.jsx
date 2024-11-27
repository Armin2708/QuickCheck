import AdminAttendancePage from "./instructorAttendance/AdminAttendancePage.jsx";
import UserAttendancePage from "./userAttendance/UserAttendancePage.jsx";
import {Box, Spinner} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {getUserById} from "../../../../services/client/users.js";
import {getClassroomById} from "../../../../services/client/classrooms.js";
import {getExistAttendance, getValidRadius} from "../../../../services/client/attendance.js";

export default function AttendanceComponent({fullUser, isAdmin, tag,
                                                 classObject, usersInClass}){
    const [classroom, setClassroom] = useState({});
    const [professor, setProfessor] = useState({});
    const [validRadius, setValidRadius] = useState(null);
    const [existAttendance, setExistAttendance] = useState(false)


    const fetchProfessor =() =>{
        getUserById(classObject?.professorId)
            .then((professorResponse) =>{
                setProfessor(professorResponse.data);
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    const fetchClassroom =() =>{
        getClassroomById(classObject?.classroomId)
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

    const fetchExistAttendance = () =>{
        getExistAttendance(tag)
            .then((res)=>{
                setExistAttendance(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    useEffect(() => {
        fetchExistAttendance()
    }, [tag]);

    useEffect(() => {
        if (classObject.professorId){
            fetchProfessor();
        }
        if (classObject.classroomId){
            fetchClassroom();
        }
        if (tag && existAttendance){
            fetchRadius()
        }
    }, [classObject,tag,existAttendance]);


    return(
        <Box width={"100%"}>
            {(fullUser.id===professor.id || isAdmin()) ? (
                <AdminAttendancePage
                    setExistAttendance={setExistAttendance}
                    existAttendance={existAttendance}
                    classObject={classObject}
                    classroom={classroom}
                    professor={professor}
                    usersInClass={usersInClass}
                    tag={tag}
                />
            ) : (usersInClass.some(user => user.id === fullUser.id) ? (
                        <UserAttendancePage
                            existAttendance={existAttendance}
                            classObject={classObject}
                            classroom={classroom}
                            professor={professor}
                            validRadius={validRadius}
                            fullUser={fullUser}
                            tag={tag}
                        />)
                    : (
                        <Spinner/>
                    )
            )}
        </Box>
    )
}
