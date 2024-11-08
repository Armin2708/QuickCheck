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
import AdminAttendanceCard from "../components/attendance/instructorAttendance/AdminAttendanceCard.jsx";
import UserAttendanceCard from "../components/attendance/userAttendance/UserAttendanceCard.jsx";
import {Box} from "@chakra-ui/react";

export default function ClassPage(){
    const [classroom, setClassroom] = useState({});
    const [classObject, setClassObject] = useState({});
    const [professor, setProfessor] = useState({});
    const [usersInClass,setUsersInClass] = useState([]);
    const [validRadius, setValidRadius] = useState(null);
    const [radius,setRadius] = useState();
    const [attendanceRequest, setAttendanceRequest] = useState({
        date: new Date().toISOString().split('T')[0],
        professorId: null,
        classId: null,
        radius: null,
    });
    const { name: orgName, id: classId } = useParams();
    const {fullUser,isUserAdmin,isUserUser} = useAuth()

    const tag = `${classId}_${new Date().toISOString().split('T')[0]}`



    const fetchData = async () => {
        try {
            // Fetch class data
            const classResponse = await getClassById(classId);
            if (classResponse.data) {
                setClassObject(classResponse.data);
                setAttendanceRequest((prev) => ({
                    ...prev,
                    classId: classResponse.data.id,
                }));


                // Fetch professor data
                const professorResponse = await getUserById(classResponse.data.professorId);
                if (professorResponse.data) {
                    setProfessor(professorResponse.data);
                    setAttendanceRequest((prev) => ({
                        ...prev,
                        professorId: professorResponse.data.id,
                    }));
                } else {
                    console.error('Expected an object for professor but got:', professorResponse.data);
                }

                // Fetch classroom data
                const classroomResponse = await getClassroomById(classResponse.data.classroomId);
                if (classroomResponse.data) {
                    setClassroom(classroomResponse.data);
                } else {
                    console.error('Expected an object for classroom but got:', classroomResponse.data);
                }
            } else {
                console.error('Expected an object for class but got:', classResponse.data);
            }

            // Fetch users in class
            const userInClass = await getUsersInClass(classId);
            if (userInClass.data) {
                setUsersInClass(userInClass.data);
            } else {
                console.error('Expected an object for users in class but got:', userInClass.data);
            }

            // Fetch valid radius
            const classRadius = await getValidRadius(tag);
            if (typeof classRadius.data === 'number') {
                setValidRadius(classRadius.data);
            } else {
                console.error('Expected a number for validRadius but got:', classRadius.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [classId]);

    useEffect(() => {
        setAttendanceRequest((prev) => ({
            ...prev,
            radius: radius,
        }));
    }, [radius]);

    const commonProps = {
        classObject,
        classroom,
        professor,
        usersInClass,
        validRadius,
        orgName,
        classId,
        fullUser,
        attendanceRequest,
        tag
    };

    return (
        <>
            {(isUserAdmin()) ?
                <AdminAttendanceCard {...commonProps} setRadius={setRadius} tag={tag} radius={radius}/>
                :
                isUserUser ? <UserAttendanceCard {...commonProps} />
                    : <Box>Error</Box>
            }
        </>
    )
}
