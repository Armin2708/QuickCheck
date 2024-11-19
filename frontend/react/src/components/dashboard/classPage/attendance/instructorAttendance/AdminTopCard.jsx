import {Box, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import getFormattedDate from "../../../../../services/dateDisplay.js";

export default function AdminTopCard({className, professorName, code, children}){

    return(
        <Stack
            padding="20px"
            borderRadius="10px"
            justify="flex-start"
            align="center"
            spacing="5px"
            width="410px"  // Dynamically adjusts to content
            maxH={"200px"}
            background={useColorModeValue("#FBFBFB","#1F1F1F")}
            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
        >
            <Stack

                spacing="4px"
                alignSelf="stretch"
                color={useColorModeValue("#313131","white")}
                fontFamily="Inter"
                fontWeight="medium"
            >
                <Text
                    fontSize="20px"
                >
                    {className} - Hello {professorName}
                </Text>
                <Box
                    fontSize="18px"
                >
                    {getFormattedDate()}
                    <Stack direction={"row"}>
                        <Text>
                            Code :
                        </Text>
                        <Text as="span" fontWeight="bold" color="#7E3BB5">
                            {code}  {/* Display the generated random code */}
                        </Text>
                    </Stack>
                </Box>
            </Stack>
            {children}
        </Stack>
    )
}