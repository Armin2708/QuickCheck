import { Box, Stack, Text } from "@chakra-ui/react";

export default function EfficiencySection() {
    return (
        <Stack
            paddingX={{ base: "20px", md: "50px", lg: "174px" }}  // Responsive padding
            paddingY={{ base: "50px", md: "100px", lg: "143px" }}  // Responsive padding
            justify="flex-start"
            align="center"  // Center content horizontally
            spacing="10px"
            width="100%"  // Full width for responsiveness
            background="#9363BA"
        >
                <Text
                    fontFamily="Inter"
                    fontWeight="bold"
                    fontSize={{ base: "36px", md: "50px", lg: "65px" }}  // Responsive font size
                    color="#FFFFFF"
                    textAlign="center"
                >
                    Efficiency Test
                </Text>

                <Stack
                    direction={{ base: "column", lg: "row" }}  // Stack vertically on smaller screens and wrap
                    justify="center"
                    align="flex-start"
                    spacing={{ base: "40px", lg: "32px" }}  // Adjust spacing on smaller screens
                    width="100%"
                    flexWrap="wrap"  // Allow wrapping when needed
                >
                    {/* Classic Attendance Section */}
                    <Stack
                        direction="row"
                        justify="flex-start"
                        align="center"
                        spacing="32px"
                        width="100%"
                        maxWidth="580px"  // Limit max width for this section
                    >
                        <Box
                            borderRadius="15px"
                            height="305px"
                            width="12px"
                            background="#EBECFF"
                            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                        />
                        <Stack
                            justify="flex-start"
                            align="flex-start"
                            spacing="14px"
                            width="100%"
                        >
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize={{ base: "32px", md: "45px", lg: "55px" }}  // Responsive font size
                                color="#EBECFF"
                            >
                                Classic Attendance
                            </Text>

                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize={{ base: "28px", md: "40px", lg: "50px" }}  // Responsive font size
                                color="#EBECFF"
                            >
                                5-10 minutes
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize={{ base: "28px", md: "40px", lg: "50px" }}  // Responsive font size
                                color="#EBECFF"
                                lineHeight="50px"  // Adjust letter spacing to reduce splitting
                            >
                                Impossible for large groups
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize={{ base: "28px", md: "40px", lg: "50px" }}  // Responsive font size
                                color="#EBECFF"
                                lineHeight="50px"  // Adjust letter spacing to reduce splitting
                            >
                                Data not tracked
                            </Text>
                        </Stack>
                    </Stack>

                    {/* Quick Check Section */}
                    <Stack
                        direction="row"
                        justify="flex-start"
                        align="center"
                        spacing="32px"
                        width="100%"
                        maxWidth="490px"  // Limit max width for this section
                    >
                        <Box
                            borderRadius="15px"
                            height="305px"
                            width="12px"
                            background="#FFFFFF"
                            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                        />
                        <Stack
                            justify="flex-start"
                            align="flex-start"
                            spacing="13px"
                            width="100%"
                        >
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize={{ base: "32px", md: "45px", lg: "55px" }}  // Responsive font size
                                color="#FFFFFF"
                            >
                                Quick Check
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize={{ base: "28px", md: "40px", lg: "50px" }}  // Responsive font size
                                color="#FFFFFF"
                            >
                                Instant
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize={{ base: "28px", md: "40px", lg: "50px" }}  // Responsive font size
                                color="#FFFFFF"
                            >
                                No group limit
                            </Text>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize={{ base: "28px", md: "40px", lg: "50px" }}  // Responsive font size
                                color="#FFFFFF"
                                lineHeight="50px"  // Adjust letter spacing to reduce splitting
                            >
                                Personalized data tracking
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
        </Stack>
    );
}
