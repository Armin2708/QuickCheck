import React, {useEffect, useState} from "react";
import {useAuth} from "../../../../context/AuthContext.jsx";
import {useParams} from "react-router-dom";
import {
    getClassById,
    getClassroomById,
    getUserById, getUsersInClass,
    getValidRadius, isUserInAttendance,
    verifyAttendance
} from "../../../../../services/client.js";
import {Button, Input, Stack, Text, useColorModeValue, useToast} from "@chakra-ui/react";
import Navbar from "../Navbar.jsx";
import getFormattedDate from "../../../../../services/dateDisplay.js";
import LocationButton from "./LocationButton.jsx";
import {FiCheckCircle, FiUser} from "react-icons/fi";
import {FaCheck} from "react-icons/fa";
import {IoWarningOutline} from "react-icons/io5";
import {errorNotification, successNotification} from "../../../../../services/notification.js";

export default function UserAttendancePage({classObject, classroom, professor,
                                               validRadius, fullUser, tag,})
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
                successNotification(
                    "Success",
                    "Attended class"
                )
                setIsPresent(true);


            })
            .catch(error => {
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
            <Stack
                spacing="20px"
                borderRadius="10px"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                {/*Top Box*/}
                <Stack
                    paddingX="30px"
                    paddingY="20px"
                    borderRadius="10px"
                    justify="flex-start"
                    align="flex-start"
                    width="fit-content"  // Dynamically adjusts to content
                    background={useColorModeValue("#FBFBFB","#1F1F1F")}
                    boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"

                    fontFamily="Inter"
                    fontWeight="medium"
                    color={useColorModeValue("#313131","white")}
                    alignItems="stretch"
                >
                    <Text fontSize="20px">
                        {classObject?.name} - Prof. {professor?.name}
                    </Text>
                    <Text fontSize="18px">
                        {getFormattedDate()}
                        <br/>
                        Class location : {classroom?.roomName}
                    </Text>
                </Stack>

                {/*Middle Action Cards*/}
                <Stack
                    direction="row"
                    justify="flex-start"
                    align="flex-start"
                    spacing="20px"
                >
                    {/*Left Card*/}
                    <Stack
                        paddingX="30px"
                        paddingY="20px"
                        maxH={"150px"}
                        borderRadius="10px"
                        align="center"
                        spacing="10px"
                        background={useColorModeValue("#FBFBFB","#1F1F1F")}
                        boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                        color={useColorModeValue("#313131","white")}
                        fontFamily="Inter"
                    >

                        <Text
                            fontWeight="semibold"
                            fontSize="40px"
                            lineHeight="35px"
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
                                fontWeight="medium"
                                fontSize="18px"
                                lineHeight={"18px"}
                            >
                                My location
                            </Text>
                            {isLocationValid && <FiCheckCircle size={"23px"} color={"#7E3BB5"}/>}
                        </Stack>

                    </Stack>

                    {/*Right Card*/}
                    <Stack
                        paddingX="30px"
                        paddingY="20px"
                        maxH={"150px"}
                        borderRadius="10px"
                        align="center"
                        spacing="10px"
                        background={useColorModeValue("#FBFBFB","#1F1F1F")}
                        color={useColorModeValue("#313131","white")}
                        boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                        fontFamily="Inter"
                    >
                        <Text
                            fontWeight="semibold"
                            fontSize="40px"
                            lineHeight="35px"
                            alignSelf="stretch"
                            textAlign="center"
                        >
                            Code
                        </Text>
                        <Stack
                            direction="row"
                            align="center"
                            spacing="6px"
                        >
                            <Input
                                name="code"
                                type="text"
                                placeholder="123..."
                                isDisabled={!isLocationValid}
                                maxLength={6}
                                inputMode="numeric"
                                pattern="[0-9]*"

                                background="#707070"
                                color="#313131"
                                fontWeight="medium"
                                fontSize="19px"
                                maxH={"38px"}

                                borderRadius="8px"
                                maxW={"134px"}
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
                                padding={"7px"}
                                borderRadius="8px"
                                background="#7E3BB5"
                                maxH={"38px"}
                                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                onClick={(e) => {
                                    handleSubmit(e?.target.value)
                                }}
                            >
                                <FaCheck  size={"100%"} color={"white"}/>
                            </Button>
                        </Stack>
                        <Stack
                            direction="row"
                            align="center"
                        >
                            <Text
                                fontWeight="medium"
                                fontSize="18px"
                                lineHeight={"18px"}
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
                    color={isPresent===true ? "#7E3BB5" :"#EBECFF"}
                >
                    <FiUser  size={"100px"} />
                    <Text
                        fontWeight="semibold"
                        fontSize="36px"
                        height="47px"
                        alignSelf="stretch"
                        textAlign="center"
                    >
                        {fullUser?.name}
                    </Text>
                </Stack>
            </Stack>
    );
}