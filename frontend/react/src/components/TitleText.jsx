import {Box, Stack, Text} from "@chakra-ui/react";

export default function TitleText({children}){
    return(
        <Text
            fontFamily="Inter"
            fontWeight="bold"
            fontSize={{ base: "36px", md: "50px", lg: "65px" }}  // Responsive font size
            color="#313131"
            textAlign="center"
        >
            {children}
        </Text>
    )
}