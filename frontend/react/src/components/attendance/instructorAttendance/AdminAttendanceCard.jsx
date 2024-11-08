import {Box, Button, Stack, Text} from "@chakra-ui/react";
import Navbar from "../Navbar.jsx";
import AttendanceStudents from "../../homePage/AttendanceStudents.jsx";
import getFormattedDate from "../dateDisplay.js";
import {useEffect, useState} from "react";
import UserAttendanceDisplay from "./UserAttendanceDisplay.jsx";
import AttendanceButton from "./AttendanceButton.jsx";
import {getAttendance, getUserById} from "../../../services/client.js";

export default function AdminAttendanceCard({classObject, orgName, classroom, professor, usersInClass,
                                                validRadius, classId,
                                                attendanceRequest, setRadius,radius, tag}){
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
        >

            <Navbar colorTheme={"light"} orgName={orgName}/>

            {/*Top Card*/}
            <Stack
                marginTop="0px"
                paddingX="20px"
                paddingY="10px"
                borderRadius="10px"
                justify="flex-start"
                align="center"
                spacing="5px"
                width="fit-content"  // Dynamically adjusts to content
                height="150px"
                background="#FBFBFB"
                boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
            >
                <Stack
                    justify="flex-start"
                    align="flex-start"
                    spacing="4px"
                    alignSelf="stretch"
                    alignContent="center"
                >
                    <Text
                        fontFamily="Inter"
                        fontWeight="medium"
                        fontSize="20px"
                        color="#313131"
                        alignSelf="stretch"
                    >
                        {classObject?.name} - Hello {professor?.name}
                    </Text>
                            <Box
                                fontFamily="Inter"
                                fontWeight="medium"
                                fontSize="18px"
                                color="#313131"
                                alignSelf="stretch"
                            >
                                {getFormattedDate()}
                                <Stack direction={"row"}>
                                    <Text>
                                        Code :
                                    </Text>
                                    <Text as="span" fontWeight="bold" color="#7E3BB5">
                                        {code}  {/* Display the generated random code */}
                                    </Text>
                                </Stack>
                            </Box>
                        </Stack>
                        <AttendanceButton setRadius={setRadius} attendanceRequest={attendanceRequest}
                                          tag={tag} existAttendance={existAttendance}
                                          status={attendanceStatus} radius={radius}
                                          setStatus={setAttendanceStatus}
                                          setExistAttendance={setExistAttendance}
                                          onSuccess={fetchAttendance}
                        />
                    </Stack>
            <UserAttendanceDisplay usersInClass={usersInClass} tag={tag}/>
        </Stack>
    )
}