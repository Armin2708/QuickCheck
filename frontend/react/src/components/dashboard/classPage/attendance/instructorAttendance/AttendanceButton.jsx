import {Button, Select, Spacer, Stack} from "@chakra-ui/react";
import {closeAttendance, createAttendance, openAttendance} from "../../../../../services/client/attendance.js";
import {useEffect, useState} from "react";

export default function AttendanceButton({tag, existAttendance, setExistAttendance, attendanceStatus,
                                             setAttendanceStatus, onSuccess, classId, professorId}){

    const [radius,setRadius] = useState();
    const [attendanceRequest, setAttendanceRequest] = useState({
        date: new Date().toISOString().split('T')[0],
        professorId: professorId,
        classId: classId,
        radius: radius,
    });

    useEffect(() => {
        setAttendanceRequest((prev) => ({
            ...prev,
            professorId: professorId,
            classId: classId,
            radius: radius,
        }));
    }, [professorId,classId,radius]);

    const handleAttendance =() =>{

        console.log(attendanceRequest)
        if(!existAttendance){
            createAttendance(attendanceRequest)
            setExistAttendance(true)
            onSuccess()
        }
        else if(attendanceStatus){
            closeAttendance(tag)
            setAttendanceStatus(false)
        }
        else{
            openAttendance(tag)
            setAttendanceStatus(true)
        }

        console.log(attendanceStatus)
    }
    return(
        <Stack
            direction="row"
            justify="center"
            align="center"
            height="38px"
            width={"100%"}
            fontFamily="Inter"
            fontWeight="medium"
            fontSize="18px"
            spacing={"20px"}
        >
            <Button
                color="#FFFFFF"
                background="#7E3BB5"
                width={""}
                paddingX="7px"
                paddingY="8px"
                borderRadius="7px"
                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                isDisabled={!existAttendance && !radius}
                onClick={()=>{
                    handleAttendance();
                }}
            >
                {!existAttendance ? "Create" : attendanceStatus ? "Close" : "Open"} Attendance
            </Button>

            {!existAttendance &&
                <Select
                placeholder='Select Type'
                width={"#7E3BB5"}
                color="#FFFFFF"
                background="#7E3BB5"
                borderColor={"#7E3BB5"}
                borderRadius="7px"
                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                _focus={{
                    outline: "none",  // Remove default outline
                    boxShadow: "0px 0px 0px 2px #7E3BB5",  // Custom focus shadow
                    border: "none",  // Ensure no border on focus
                }}
                onChange={(e) => {
                    setRadius(e.target.value)
                }}
            >
                <option value='0'>Online</option>
                <option value='20'>Classroom</option>
                <option value='100'>Amphitheater</option>
                <option value='200'>Warehouse</option>
                <option value='300'>Stadium</option>
            </Select>}
        </Stack>
    )
}