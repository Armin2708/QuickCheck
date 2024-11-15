import {Box, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack} from "@chakra-ui/react";

import React, {useEffect, useState} from "react";
import StatisticComponent from "./statistic/StatisticComponent.jsx";
import {useParams} from "react-router-dom";
import {getClassById, getUsersInClass,} from "../../../services/client.js";
import AttendanceComponent from "./attendance/AttendanceComponent.jsx";
import ChatComponent from "../chat/ChatComponent.jsx";

export default function ClassPageComponent({fullUser, isAdmin, isUser}){

    const [classObject, setClassObject] = useState({});
    const [usersInClass,setUsersInClass] = useState([]);

    const [activeTab, setActiveTab] = useState(0);

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
        fetchClass();
        fetchUsersInClass();
    }, [classId,orgName]);

    return(
        <VStack width={"100%"} height={"100%"}>
            <Tabs variant='soft-rounded' colorScheme='green' width="100%" onChange={(index) => setActiveTab(index)}
            >
                <Box
                    height={{ base: "100%", md: "100px" }} // Full width on mobile, fixed width on larger screens
                    width="100%" // Full height of the viewport
                    background="#D9D9D9" // Sidebar background
                    boxShadow="2px 0 5px rgba(0, 0, 0, 0.1)" // Optional shadow
                    padding="20px"
                >
                    <TabList >
                        <Tab>Attendance</Tab>
                        <Tab>Chat</Tab>
                        <Tab>Stats</Tab>
                    </TabList>
                </Box>
                <HStack>
                    <TabPanels>
                        <TabPanel>
                            {activeTab === 0 &&<AttendanceComponent
                                fullUser={fullUser}
                                isAdmin={isAdmin}
                                isUser={isUser}
                                tag={tag}
                                classObject={classObject}
                                usersInClass={usersInClass}
                            />}
                        </TabPanel>
                        <TabPanel>
                            {activeTab === 1 &&<ChatComponent/>}
                        </TabPanel>
                        <TabPanel>
                            {activeTab === 2 &&<StatisticComponent statsData={statsData}/>}
                        </TabPanel>
                    </TabPanels>
                </HStack>
            </Tabs>
        </VStack>
    )
}