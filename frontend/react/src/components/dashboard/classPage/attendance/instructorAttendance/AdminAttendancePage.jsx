import {Stack} from "@chakra-ui/react";
import Navbar from "../Navbar.jsx";
import {useEffect, useState} from "react";
import AttendanceButton from "./AttendanceButton.jsx";
import {getAttendance} from "../../../../../services/client.js";
import AdminTopCard from "./AdminTopCard.jsx";
import UserCardDisplay from "./UserCardDisplay.jsx";

export default function AdminAttendancePage({classObject, professor, usersInClass, tag}){
    const [code,setCode] = useState()
    const [existAttendance, setExistAttendance] = useState(false)
    const [attendanceStatus,setAttendanceStatus] = useState(true)


    const fetchAttendance =() => {
        getAttendance(tag)
            .then(res => {
                setCode(res?.data.code)
                setExistAttendance(true);
                setAttendanceStatus(res?.data.openStatus)
            })
            .catch(err =>{
                console.log(err)
                setExistAttendance(false);
                setAttendanceStatus(false);
            })
    }

    useEffect(() => {
        fetchAttendance()
    }, [tag]);

    return(
        <Stack backgroundColor={"#F9F9F9"}
               height={"100%"}
               display="flex"
               flexDirection="column"
               alignItems="center"
               spacing={"20px"}
        >

            <AdminTopCard className={classObject?.name} professorName={professor?.name} code={code}>
                <AttendanceButton tag={tag}
                                  existAttendance={existAttendance}
                                  setExistAttendance={setExistAttendance}
                                  attendanceStatus={attendanceStatus}
                                  setAttendanceStatus={setAttendanceStatus}
                                  onSuccess={fetchAttendance}
                                  classId={classObject?.id}
                                  professorId={professor?.id}
                />
            </AdminTopCard>

            <UserCardDisplay usersInClass={usersInClass} tag={tag} existAttendance={existAttendance}/>

        </Stack>
    )
}