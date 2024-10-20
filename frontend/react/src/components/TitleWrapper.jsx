import {Stack} from "@chakra-ui/react";

export default function TitleWrapper({children}){
    return(
        <Stack
            justify="flex-start"
            align="center"
            spacing="16px"
            width="100%"
            maxWidth="822px"
        >
            {children}
        </Stack>
    )
}