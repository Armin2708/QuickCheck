import EfficiencySection from "../components/homePage/EfficiencySection.jsx";
import PresentationSection from "../components/homePage/PresentationSection.jsx";
import SupportedBy from "../components/homePage/SupportedBy.jsx";
import SneakPeek from "../components/homePage/SneakPeek.jsx";
import CommunityComments from "../components/homePage/CommunityComments.jsx";
import AdvantageTabs from "../components/homePage/AdvantageTabs.jsx";
import JoinQuickCheck from "../components/homePage/JoinQuickCheck.jsx";
import StatisticComponent from "../components/dashboard/classPage/statistic/StatisticComponent.jsx";
import {Box, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack} from "@chakra-ui/react";
import AttendanceComponent from "../components/dashboard/classPage/attendance/AttendanceComponent.jsx";
import ChatComponent from "../components/dashboard/chat/ChatComponent.jsx";
import React, {useState} from "react";

export default function Test() {

    const statsData = {
        labels: ['Present', 'Absent'], // Labels for the chart
        values: [70, 20] // Corresponding values (70% present, 30% absent)
    };

    const [activeTab, setActiveTab] = useState(0);

    return (
        <Tabs
            variant="soft-rounded"
            colorScheme="green"
            width="100%"
            onChange={(index) => setActiveTab(index)}
        >
            <Box
                height={{ base: "100%", md: "100px" }}
                width="100%"
                background="#D9D9D9"
                boxShadow="2px 0 5px rgba(0, 0, 0, 0.1)"
                padding="20px"
            >
                <TabList>
                    <Tab>Attendance</Tab>
                    <Tab>Chat</Tab>
                    <Tab>Stats</Tab>
                </TabList>
            </Box>
            <TabPanels>
                <TabPanel>
                    {activeTab === 0 && <Text>Attendance</Text>}
                </TabPanel>
                <TabPanel>
                    {activeTab === 1 && <Text>Chat</Text>}
                </TabPanel>
                <TabPanel>
                    {activeTab === 2 && <StatisticComponent statsData={statsData} />}
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
