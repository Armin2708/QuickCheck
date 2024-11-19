import {Box, Spacer} from "@chakra-ui/react";
import React from "react";
import ProfileComponent from "./dashboard/ProfileComponent.jsx";

export default function HeadSection({children}){
    return(
        <Box height="72px" paddingX="24px" paddingY="16px" width="100%" display="flex">
            {children}
            <Spacer />
            <ProfileComponent />
        </Box>
    )
}