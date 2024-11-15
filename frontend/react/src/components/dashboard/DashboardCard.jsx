import {Box, VStack} from "@chakra-ui/react";

export default function DashboardCard({children}){
    return(
        <Box
            width={"100%"}
            direction={"column"}
            border={"1px"}
            borderRadius={"20px"}
            borderColor={"#D9D9D9"}
            backgroundColor={"white"}
            boxShadow={"2xl"}
            paddingX={"20px"}
            paddingY={"10px"}
        >
            <VStack spacing={"10px"}>
                {children}
            </VStack>
        </Box>
    )
}