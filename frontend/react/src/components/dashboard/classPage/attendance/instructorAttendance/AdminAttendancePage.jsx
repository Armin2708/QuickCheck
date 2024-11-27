import {Stack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import AttendanceButton from "./AttendanceButton.jsx";
import {getAttendance} from "../../../../../services/client/attendance.js";
import AdminTopCard from "./AdminTopCard.jsx";
import UserCardDisplay from "./UserCardDisplay.jsx";

export default function AdminAttendancePage({classObject, professor, usersInClass, tag, existAttendance, setExistAttendance}){
    const [code,setCode] = useState()
    const [attendanceStatus,setAttendanceStatus] = useState(true)


    const fetchAttendance =() => {
        getAttendance(tag)
            .then(res => {
                setCode(res?.data.code)
                setAttendanceStatus(res?.data.openStatus)
            })
            .catch(err =>{
                console.log(err)
                setAttendanceStatus(false);
            })
    }

    useEffect(() => {
        if (tag && existAttendance){
            fetchAttendance()
        }
    }, [tag,existAttendance]);

    return(
        <Stack
               height={"100%"}
               width={"100%"}
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