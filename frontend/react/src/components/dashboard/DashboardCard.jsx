import {
    Box,
    Spacer, Text
} from "@chakra-ui/react";

import HeadSection from "../HeadSection.jsx";


export default function DashboardCard({children, cardColor}){
    return(
        <Box
            width="100%"
            height="100%"
            borderRadius="12px"
            display="flex"
            flexDir="column"
            gap="20px"
            bg={cardColor}
            p="12px"
            paddingX={"20px"}
            overflow="auto" /* Prevent the shadow from clipping outside the container */
            position="relative" /* Ensure the shadow is correctly positioned */
        >
            <HeadSection/>

            {children}

            <Spacer/>
            <Box width="100%">
                <Text fontSize="20px" textAlign={"center"}>© Quick Check - All Rights Reserved</Text>
            </Box>
        </Box>
    )
}
