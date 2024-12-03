import {
    Box, Button, HStack, Spacer, Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue,
} from "@chakra-ui/react";

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getClassById} from "../../../services/client/classes.js";
import StatisticComponent from "./statistic/StatisticComponent.jsx";
import AttendanceComponent from "./attendance/AttendanceComponent.jsx";
import UpdateClassButton from "../classList/class/UpdateClassButton.jsx";
import DeleteClassButton from "../classList/class/DeleteClassButton.jsx";

import ChatPage from "./chat/ChatPage.jsx";
import {getUsersInClass} from "../../../services/client/users.js";
import CalendarComponent from "./calendar/CalendarComponent.jsx";
import MyCalendar from "../../shared/calendar/MyCalendar.jsx";
import LeaveClassButton from "../classList/class/LeaveClassButton.jsx";

export default function ClassPageComponent({fullUser, isAdmin, isUser}){

    const [classObject, setClassObject] = useState({});
    const [usersInClass,setUsersInClass] = useState([]);
    const [step, setStep] = useState(1)

    const [chatId, setChatId] = useState(-1)

    const { name: orgName, id: classId } = useParams();

    const tag = `${classId}_${new Date().toISOString().split('T')[0]}`

    const statsData = {
        labels: ['Present', 'Absent'], // Labels for the chart
        values: [70, 20] // Corresponding values (70% present, 30% absent)
    };


    const fetchClass = () => {
        getClassById(classId)
            .then((classResponse) => {
                setClassObject(classResponse.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const fetchUsersInClass =() =>{
        getUsersInClass(classId)
            .then((usersRes)=>{
                setUsersInClass(usersRes.data);
            })
            .catch((err)=> {
                console.log(err)
            })
    };


    useEffect(() => {
        if(classId){
            fetchClass();
            fetchUsersInClass();
        }
    }, [classId,orgName]);

    return(
        <Box
            bg={useColorModeValue("white", "#181818")}
            width="100%"
            flex={1}
            display="flex"
            flexDirection="column"
            borderWidth={"1px"}
            borderStyle={"solid"}
            borderColor={useColorModeValue("","#181818")}
            gap="10px"
            borderRadius="20px"
            position="relative"
            _after={{
                content: '""', // Create a pseudo-element for the exterior shadow
                position: 'absolute',
                width: 'calc(100% + 150px)', // Extend the shadow beyond the box
                height: 'calc(100% + 150px)',
                backgroundImage: `url(${useColorModeValue("https://www.rwongphoto.com/images/xl/RW6523-2_web.jpg","https://t3.ftcdn.net/jpg/03/28/52/28/360_F_328522876_UkU9gj4jQO7sUSp7vJnbn5jXYahSgzP0.jpg")})`, // Use the background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(50px)', // More blur for a softer exterior shadow
                opacity: useColorModeValue(0.35,0.25), // Lower opacity for a subtle exterior shadow
                zIndex: -2, // Place behind the interior shadow
                transform: 'translate(-75px, -75px)', // Adjust spread area
            }}
            style={{
                backdropFilter: 'blur(10px)', // Apply blur effect to background content
                WebkitBackdropFilter: 'blur(10px)', // Safari support
            }}
        >
            <Tabs
                variant="soft-rounded"
                colorScheme="green"

            >
                <HStack width="100%" padding="16px">
                    <TabList>
                        <Tab>Attendance</Tab>
                        <Tab>Chat</Tab>
                        <Tab onClick={() => setStep(3)}>Statistics</Tab>
                        <Tab onClick={() => setStep(4)}>Calendar</Tab>
                    </TabList>
                    <Spacer />
                    {(isAdmin() || fullUser.id === classObject.professorId) ? (
                        <>
                            <UpdateClassButton {...classObject} onSuccess={fetchClass} />
                            <DeleteClassButton {...classObject} onSuccess={fetchClass} />
                        </>
                    ) : null}
                    <LeaveClassButton fullUser={fullUser} classId={classId} orgName={orgName}/>
                </HStack>

                <TabPanels height={"100%"} width={"100%"}>
                    <TabPanel height="100%"> {/* Ensure TabPanel stretches */}
                        <Box display="flex" flexDirection="row" gap="16px" flex={1}>
                            <AttendanceComponent
                                fullUser={fullUser}
                                isAdmin={isAdmin}
                                isUser={isUser}
                                tag={tag}
                                classObject={classObject}
                                usersInClass={usersInClass}
                            />
                        </Box>
                    </TabPanel>
                    <TabPanel height="100%"> {/* Ensure height propagates */}
                        <ChatPage setChatId={setChatId} chatId={chatId} />
                    </TabPanel>
                    <TabPanel height="100%"> {/* Ensure height propagates */}
                        {step === 3 ? (
                            <StatisticComponent
                                fullUser={fullUser}
                                tag={tag}
                                classId={classId}
                                isAdmin={isAdmin}
                                professorId={classObject?.professorId}
                            />
                        ) : null}
                    </TabPanel>
                    <TabPanel >

                        {step === 4 ? (
                            <CalendarComponent fullUser={fullUser} professorId={classObject?.professorId}
                                            classId={classId} isAdmin={isAdmin}/>
                        ) : <Spinner/>}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}


