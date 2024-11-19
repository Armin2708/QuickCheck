import {Box, Button, HStack, Spacer, Stack, Text, useColorMode, useColorModeValue} from "@chakra-ui/react";

import SideBar from "./SideBar.jsx";
import DashboardCard from "./DashboardCard.jsx";
import {Outlet} from "react-router-dom";

export default function DashboardWrap({children}) {
    const cardColor= useColorModeValue('gray.100', '#121212')
    return (
        <Box
            padding="8px"
            gap="10px"
            display="flex"
            flexDirection="row"
            height="100vh" /* Full viewport height */
            boxSizing="border-box" /* Ensures padding is included in the total height calculation */
            bg={useColorModeValue("white","black")}
        >
            {/* Sidebar */}
            <SideBar cardColor={cardColor}/>
            {/* Dashboard Content */}
            <DashboardCard cardColor={cardColor}>
                <Outlet />
            </DashboardCard>
        </Box>

    );
}
