import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {useParams} from "react-router-dom";
import {
    getClassById,
    getClassroomById,
    getUserById, getUsersInClass,
    getValidRadius, isUserInAttendance,
    verifyAttendance
} from "../../../services/client.js";
import {Button, Input, Stack, Text, useToast} from "@chakra-ui/react";
import Navbar from "../Navbar.jsx";
import getFormattedDate from "../../../services/dateDisplay.js";
import LocationButton from "./LocationButton.jsx";
import {FiCheckCircle, FiUser} from "react-icons/fi";
import {FaCheck} from "react-icons/fa";
import {IoWarningOutline} from "react-icons/io5";
import {errorNotification, successNotification} from "../../../services/notification.js";

export default function UserAttendancePage({classObject, classroom, professor, usersInClass,
                                               validRadius, orgName, classId, fullUser,tag,})
{

    const [isLocationValid, setIsLocationValid] = useState(false)
    const [isCodeValid, setIsCodeValid] = useState(null);  // To store if the code is valid or not
    const [inputCode,setInputCode] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [isPresent,setIsPresent] = useState(false)

    const toast = useToast()

    const handleSubmit = () =>{
        setIsLoading(true); // Start loading
        const attendanceData ={
            attendanceTag: tag,
            code: inputCode
        }
        verifyAttendance(fullUser?.id,attendanceData)
            .then(res => {
                console.log(res.data)
                successNotification(
                    "Success",
                    "Attended class"
                )
                setIsPresent(true);


            })
            .catch(error => {
                console.error('Error fetching users:', error);
                errorNotification(
                    error.code,
                    error.response.data.message
                )
                setIsPresent(false);

            })
            .finally(() => {
                setIsLoading(false); // Stop loading after fetch
            });
    }

    const checkUserAttendance = () =>{
        isUserInAttendance(tag,fullUser?.id)
            .then(res =>{
                setIsPresent(res.data)
            })
    }

    useEffect(() => {
        if (fullUser.id){
            checkUserAttendance()
        }
    }, [fullUser]);


    return (
        <Stack backgroundColor={"#252525"}
               height={"100vh"}
               display="flex"
               flexDirection="column"
               alignItems="center"
               spacing={"20px"}
        >

            {/*Card*/}
            <Stack
                marginBottom={"50px"}
                paddingX="30px"
                paddingY="30px"
                borderRadius="10px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                spacing="30px"
                width="700px"
                height="600px"
                background={"#313131"}
                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            >
                {/*Top Box*/}
                <Stack
                    paddingX="38px"
                    paddingY="31px"
                    borderRadius="10px"
                    justify="flex-start"
                    align="flex-start"
                    spacing="10px"
                    width="fit-content"  // Dynamically adjusts to content
                    height="135px"
                    background="#444343"
                    boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                >
                    <Stack
                        justify="flex-start"
                        align="flex-start"
                        spacing="4px"
                    >
                        <Text
                            fontFamily="Inter"
                            fontWeight="medium"
                            fontSize="20px"
                            color="#707070"
                            alignSelf="stretch"
                            width="auto"  // Allows the text width to adjust
                        >
                            {classObject?.name} - Prof. {professor?.name}
                        </Text>
                        <Text
                            fontFamily="Inter"
                            fontWeight="medium"
                            fontSize="18px"
                            color="#707070"
                            alignSelf="stretch"
                        >
                            {getFormattedDate()}
                            <br/>
                            Class location : {classroom?.roomName}
                        </Text>
                    </Stack>
                </Stack>

                {/*Middle Action Cards*/}
                <Stack
                    direction="row"
                    justify="flex-start"
                    align="flex-start"
                    spacing="26px"
                >
                    {/*Left Card*/}
                    <Stack
                        paddingX="34px"
                        paddingY="12px"
                        borderRadius="10px"
                        justify="flex-start"
                        align="center"
                        spacing="16px"
                        width="269px"
                        height="170px"
                        maxWidth="100%"
                        background="#444343"
                        boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                    >

                        <Text
                            fontFamily="Inter"
                            fontWeight="semibold"
                            fontSize="45px"
                            color="#707070"
                            height="47px"
                            alignSelf="stretch"
                            textAlign="center"
                        >
                            Location
                        </Text>
                        <LocationButton
                            classroomLocation={classroom?.location}
                            validRadius={validRadius}
                            disabled={isLocationValid}
                            setIsLocationValid={setIsLocationValid}
                        />
                        <Stack
                            direction="row"
                            justify="flex-start"
                            align="center"
                            spacing="7px"
                        >
                            <Text
                                fontFamily="Inter"
                                fontWeight="medium"
                                fontSize="18px"
                                color="#707070"
                            >
                                My location
                            </Text>
                            {isLocationValid && <FiCheckCircle size={"23px"} color={"#7E3BB5"}/>}
                        </Stack>

                    </Stack>

                    {/*Right Card*/}
                    <Stack
                        paddingX="34px"
                        paddingY="12px"
                        borderRadius="10px"
                        justify="flex-start"
                        align="center"
                        spacing="16px"
                        width="269px"
                        height="170px"
                        maxWidth="100%"
                        background="#444343"
                        boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                    >
                        <Text
                            fontFamily="Inter"
                            fontWeight="semibold"
                            fontSize="45px"
                            color="#707070"
                            height="47px"
                            alignSelf="stretch"
                            textAlign="center"
                        >
                            Code
                        </Text>
                        <Stack
                            direction="row"
                            justify="flex-start"
                            align="center"
                            spacing="6px"
                            alignSelf="stretch"
                        >
                            <Input
                                name="code"
                                type="text"
                                placeholder="Enter Code"
                                isDisabled={!isLocationValid}
                                maxLength={6}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                background="#707070"
                                color="#313131"
                                fontWeight="medium"
                                fontSize="20px"
                                boxShadow="inset 1px 1px 2px 1px rgba(0, 0, 0, 0.12)"
                                border="none"  // Remove default border
                                _focus={{
                                    outline: "none",  // Remove default outline
                                    boxShadow: "0px 0px 0px 2px #7E3BB5",  // Custom focus shadow
                                    border: "none",  // Ensure no border on focus
                                }}
                                onChange={(e)=>{
                                    setInputCode(e.target.value)
                                }}
                            />
                            <Button
                                isDisabled={!isLocationValid}
                                paddingX="9px"
                                paddingY="11px"
                                borderRadius="8px"
                                justify="flex-start"
                                align="flex-start"
                                spacing="10px"
                                width="38px"
                                height="38px"
                                background="#7E3BB5"
                                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                onClick={(e) => {
                                    handleSubmit(e?.target.value)
                                }}
                            >
                                <FaCheck color="#313131" size={"100%"}/>
                            </Button>
                        </Stack>
                        <Stack
                            direction="row"
                            justify="flex-start"
                            align="center"
                            spacing="7px"
                        >
                            <Text
                                fontFamily="Inter"
                                fontWeight="medium"
                                fontSize="18px"
                                color="#707070"
                            >
                                {isCodeValid === null ? "Enter Code" : isCodeValid ? "Valid Code" : "Invalid Code"}
                            </Text>
                            {isCodeValid === true ? <FiCheckCircle size={"23px"} color={"#7E3BB5"}/>
                                : isCodeValid === false ?
                                    <IoWarningOutline size="23px" color="#7E3BB5"/> : null}
                        </Stack>

                    </Stack>
                </Stack>

                {/*User Icon*/}
                <Stack
                    justify="flex-start"
                    align="center"
                    spacing="9px"
                    width="269px"
                    maxWidth="100%"
                >
                    <FiUser color={isPresent===true ? "7E3BB5" :"#707070"} size={"100px"} />
                    <Text
                        fontFamily="Inter"
                        fontWeight="semibold"
                        fontSize="36px"
                        color="#707070"
                        height="47px"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        {fullUser?.name}
                    </Text>
                </Stack>
            </Stack>
        </Stack>
    );
}