import {Button, Select, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import {closeAttendance, createAttendance, openAttendance} from "../../../services/client.js";

export default function AttendanceButton({tag,attendanceRequest,radius,setRadius, existAttendance,setExistAttendance,status, setStatus, onSuccess}){

    const handleAttendance =() =>{

        if(!existAttendance){
            createAttendance(attendanceRequest)
            setExistAttendance(true)
            onSuccess()
        }
        else if(status){
            closeAttendance(tag)
            setStatus(false)
        }
        else{
            openAttendance(tag)
            setStatus(true)
        }
    }
    return(
        <Stack
            direction="row"
            justify="center"
            align="center"
            spacing="10px"
            height="38px"
            width={"100%"}
        >
            <Button
                fontFamily="Inter"
                fontWeight="medium"
                fontSize="18px"
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
                {!existAttendance ? "Create" : status? "Close" : "Open"} Attendance
            </Button>
            {!existAttendance &&
                <Select
                placeholder='type'
                fontFamily="Inter"
                fontWeight="medium"
                fontSize="18px"
                width={""}
                color="#FFFFFF"
                background="#7E3BB5"
                paddingX="7px"
                paddingY="8px"
                borderRadius="7px"
                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
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