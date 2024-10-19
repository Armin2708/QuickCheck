import { Box, Text, Stack, Button } from "@chakra-ui/react";
import { LiaAwardSolid } from "react-icons/lia";

export default function Presentation() {
    return (
        <Stack
            justify="flex-start"
            align="center"  // Center the content horizontally
            spacing="0px"
            width="100%"
            maxWidth="100%"
        >
            <Stack
                paddingX={{ base: "20px", md: "10%", lg: "15%" }}  // Responsive padding
                paddingY={{ base: "50px", md: "80px" }}  // Responsive padding
                justify="flex-start"
                align="center"  // Center the content horizontally
                spacing="10px"
                width="100%"  // Full width
                background="#FFFFFF"
            >
                <Stack
                    justify="flex-start"
                    align="center"  // Center the heading horizontally
                    spacing="50px"
                    width="100%"  // Full width
                    maxWidth="690px"
                >
                    {/* Main Heading */}
                    <Text
                        fontFamily="Inter"
                        fontWeight="bold"
                        fontSize={{ base: "36px", sm: "50px", md: "60px", lg: "70px" }}  // Responsive font size
                        color="#313131"
                        textAlign="center"  // Center the text
                    >
                        Take attendance on your device{" "}
                        <Box as="span" color="#7E3BB5">
                            Instantly
                        </Box>
                    </Text>

                    {/* Button Section */}
                    <Stack
                        justify="center"
                        align="center"
                        spacing="30px"
                        width="100%"
                        maxWidth="440px"
                    >
                        <Stack
                            direction="row"
                            justify="space-between"
                            align="center"
                            spacing="12px"
                            width="100%"
                        >
                            {/* Get Started Button */}
                            <Button
                                paddingX="20px"
                                paddingY="20px"
                                borderRadius="10px"
                                justify="center"
                                align="center"
                                background="#7E3BB5"
                                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                width="204px"
                                height="74px"
                                _hover={{ background: "#6C33A1" }}  // Hover effect
                                _active={{
                                    transform: "scale(0.95)",  // Scale down a bit on click
                                    background: "#6C33A1",  // Change background when active
                                }}
                            >
                                <Text
                                    fontFamily="Inter"
                                    fontWeight="semibold"
                                    fontSize={{ base: "20px", md: "26px" }}
                                    color="white"
                                    textAlign="center"
                                >
                                    Get Started ->
                                </Text>
                            </Button>

                            {/* Learn More Button */}
                            <Button
                                paddingX="20px"
                                paddingY="20px"
                                borderRadius="10px"
                                justify="center"
                                align="center"
                                background="#F9F9F9"
                                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                width="204px"
                                height="74px"
                                _hover={{ background: "#e2e2e2" }}  // Optional hover effect
                                _active={{
                                    transform: "scale(0.95)",  // Scale down a bit on click
                                    background: "#e2e2e2",  // Change background when active
                                }}
                            >
                                <Text
                                    fontFamily="Inter"
                                    fontWeight="semibold"
                                    fontSize={{ base: "20px", md: "26px" }}
                                    color="#707070"
                                    textAlign="center"
                                >
                                    Learn More
                                </Text>
                            </Button>
                        </Stack>

                        {/* Award Button */}
                        <Button
                            paddingX="20px"
                            paddingY="20px"
                            borderRadius="10px"
                            justify="flex-start"
                            align="flex-start"
                            background="#EBECFF"
                            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                            width="331px"
                            height="104px"
                            _hover={{ background: "#d8dafb" }}  // Optional hover effect
                        >
                            <Stack direction="row" justify="flex-start" align="center" spacing="12px">
                                <LiaAwardSolid color={"#A15FDD"} size={"100%"}/>
                                <Stack justify="flex-start" align="flex-start" spacing="0px">
                                    <Text
                                        fontFamily="Inter"
                                        fontWeight="semibold"
                                        fontSize="11px"
                                        color="#313131"
                                    >
                                        CSULA Software Award 🏅
                                    </Text>
                                    <Text
                                        fontFamily="Inter"
                                        fontWeight="semibold"
                                        fontSize="18px"
                                        color="#A15FDD"
                                    >
                                        Most Creative Project
                                    </Text>
                                    <Text
                                        fontFamily="Inter"
                                        fontWeight="semibold"
                                        fontSize="18px"
                                        color="#A15FDD"
                                    >
                                        for Education
                                    </Text>
                                </Stack>
                            </Stack>
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
