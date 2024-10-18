import { Stack, Box, Text, Menu } from '@chakra-ui/react'

export default function Footer(){
    return(
        <Stack
            paddingX="89px"
            paddingY="52px"
            justify="flex-start"
            align="flex-start"
            spacing="10px"
            width="1512px"
            height="181px"
            maxWidth="100%"
            background="#EDEDED"
        >
            <Stack
                direction="row"
                justify="space-between"
                align="center"
                spacing="635px"
                width="1274px"
                maxWidth="100%"
            >
                <Stack direction="row" justify="flex-start" align="center" spacing="1px">
                    <Box width="78px" height="75px" />
                    <Text
                        fontFamily="Inter"
                        fontWeight="bold"
                        fontSize="26px"
                        color="#313131"
                        width="172px"
                        height="77px"
                        textAlign="center"
                    >
                        Quick Check
                    </Text>
                </Stack>
                <Stack direction="row" justify="flex-start" align="center" spacing="0px">
                    <Text
                        fontFamily="Inter"
                        fontWeight="semibold"
                        fontSize="20px"
                        color="#707070"
                        width="92px"
                        height="29px"
                        textAlign="center"
                    >
                        Docs
                    </Text>
                    <Text
                        fontFamily="Inter"
                        fontWeight="semibold"
                        fontSize="20px"
                        color="#707070"
                        width="113px"
                        height="29px"
                        textAlign="center"
                    >
                        Privacy
                    </Text>
                    <Text
                        fontFamily="Inter"
                        fontWeight="regular"
                        fontSize="18px"
                        color="#313131"
                        width="183px"
                        height="29px"
                        textAlign="center"
                    >
                        <span>©️ </span>
                        <Box as="span" fontSize="20px">
                            Quick Check
                        </Box>
                    </Text>
                </Stack>
            </Stack>
        </Stack>

)
}