import {Box, Card, Stack, Text} from "@chakra-ui/react";

export default function Efficiency(){
    return(
        <Stack
            paddingX="174px"
            paddingY="143px"
            justify="flex-start"
            align="flex-start"
            spacing="10px"
            width="1512px"
            height="848px"
            maxWidth="100%"
            background="#9363BA"
        >
            <Stack
                justify="flex-start"
                align="center"
                spacing="67px"
                width="1163px"
                maxWidth="100%"
            >
                <Text
                    fontFamily="Inter"
                    fontWeight="bold"
                    fontSize="65px"
                    color="#FFFFFF"
                    height="92px"
                    alignSelf="stretch"
                    textAlign="center"
                >
                    Efficiency Test
                </Text>
                <Stack
                    direction="row"
                    justify="flex-start"
                    align="flex-start"
                    spacing="0px"
                    alignSelf="stretch"
                >
                    <Stack
                        direction="row"
                        justify="flex-start"
                        align="center"
                        spacing="32px"
                    >
                        <Box
                            borderRadius="15px"
                            height="305px"
                            width="12px"
                            maxWidth="100%"
                            background="#EBECFF"
                            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                        />
                        <Stack
                            justify="flex-start"
                            align="flex-start"
                            spacing="14px"
                            width="605px"
                            maxWidth="100%"
                        >
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="55px"
                                color="#EBECFF"
                                height="98px"
                                alignSelf="stretch"
                            >
                                Classic Attendance
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="50px"
                                color="#EBECFF"
                                height="66px"
                                alignSelf="stretch"
                            >
                                5-10 minutes
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="50px"
                                color="#EBECFF"
                                height="126px"
                                alignSelf="stretch"
                            >
                                Impossible for large groupes
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="50px"
                                color="#EBECFF"
                                height="70px"
                                alignSelf="stretch"
                            >
                                Data not tracked
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        justify="flex-start"
                        align="center"
                        spacing="32px"
                    >
                        <Box
                            borderRadius="15px"
                            height="305px"
                            width="12px"
                            maxWidth="100%"
                            background="#FFFFFF"
                            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                        />
                        <Stack
                            justify="flex-start"
                            align="flex-start"
                            spacing="13px"
                            width="470px"
                            maxWidth="100%"
                        >
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="55px"
                                color="#FFFFFF"
                                height="98px"
                                alignSelf="stretch"
                            >
                                Quick Check
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="50px"
                                color="#FFFFFF"
                                height="66px"
                                alignSelf="stretch"
                            >
                                <span>Instant</span>
                                <Box as="span" color="#EBECFF"></Box>
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="50px"
                                color="#FFFFFF"
                                height="64px"
                                alignSelf="stretch"
                            >
                                <span>No group limit</span>
                                <Box as="span" color="#EBECFF"></Box>
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="50px"
                                color="#FFFFFF"
                                height="134px"
                                alignSelf="stretch"
                            >
                                <span>Personalized data tracking</span>
                                <Box as="span" color="#EBECFF"></Box>
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>

)
}