import {Box, Stack, Text} from "@chakra-ui/react";
import getFormattedDate from "../../../services/dateDisplay.js";

export default function AdminTopCard({className, professorName, code, children}){

    return(
        <Stack
            marginTop="0px"
            paddingX="20px"
            paddingY="10px"
            borderRadius="10px"
            justify="flex-start"
            align="center"
            spacing="5px"
            width="fit-content"  // Dynamically adjusts to content
            height="150px"
            background="#FBFBFB"
            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
        >
            <Stack
                justify="flex-start"
                align="flex-start"
                spacing="4px"
                alignSelf="stretch"
                alignContent="center"
            >
                <Text
                    fontFamily="Inter"
                    fontWeight="medium"
                    fontSize="20px"
                    color="#313131"
                    alignSelf="stretch"
                >
                    {className} - Hello {professorName}
                </Text>
                <Box
                    fontFamily="Inter"
                    fontWeight="medium"
                    fontSize="18px"
                    color="#313131"
                    alignSelf="stretch"
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