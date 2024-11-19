import EfficiencySection from "../components/homePage/EfficiencySection.jsx";
import PresentationSection from "../components/homePage/PresentationSection.jsx";
import SupportedBy from "../components/homePage/SupportedBy.jsx";
import SneakPeek from "../components/homePage/SneakPeek.jsx";
import CommunityComments from "../components/homePage/CommunityComments.jsx";
import AdvantageTabs from "../components/homePage/AdvantageTabs.jsx";
import JoinQuickCheck from "../components/homePage/JoinQuickCheck.jsx";
import StatisticComponent from "../components/dashboard/classPage/statistic/StatisticComponent.jsx";
import {
    AccordionIcon, AccordionItem, AccordionPanel,
    Box,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import AttendanceComponent from "../components/dashboard/classPage/attendance/AttendanceComponent.jsx";
import ChatComponent from "../components/dashboard/classPage/chat/ChatComponent.jsx";
import React, {useState} from "react";
import DashboardCard from "../components/dashboard/DashboardCard.jsx";
import OrganizationCard from "../components/dashboard/organizationList/organization/OrganizationCard.jsx";
import ClassListComponent from "../components/dashboard/classList/ClassListComponent.jsx";

export default function Test() {

    const statsData = {
        labels: ['Present', 'Absent'], // Labels for the chart
        values: [70, 20] // Corresponding values (70% present, 30% absent)
    };

    const [activeTab, setActiveTab] = useState(0);

    return (
        <AccordionItem key={organization.id} borderColor="transparent">
            <Box flex="1" textAlign="left" w="full" h="full">
                <OrganizationCard
                    {...organization}
                    onSuccess={fetchOrganization}
                    fullUser={fullUser}
                />
            </Box>
            <AccordionIcon />
            <AccordionPanel padding="0px" maxH="200px" overflowY="auto">
                <ClassListComponent fullUser={fullUser} />
            </AccordionPanel>
        </AccordionItem>
    )
}
