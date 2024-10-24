import {Text} from "@chakra-ui/react";

export default function TitleDescription({children}){
    return(
        <Text
            fontFamily="Inter"
            fontWeight="semibold"
            fontSize={{ base: "18px", md: "22px", lg: "24px" }}  // Responsive font size
            color="#707070"
            width="100%"
            maxWidth="508px"
            textAlign="center"
        >
            {children}
        </Text>
    )
}