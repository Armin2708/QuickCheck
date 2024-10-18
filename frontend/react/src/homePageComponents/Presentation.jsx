import { Box, Text, Stack } from "@chakra-ui/react";
import { LiaAwardSolid } from "react-icons/lia";

export default function Presentation() {
    return (
        <Stack
            justify="flex-start"
            align="flex-start"
            spacing="0px"
            width="100%"  // Full width of the screen
            maxWidth="100%"
        >
            <Stack
                paddingX={{ base: "20px", md: "10%", lg: "15%" }} // Responsive padding
                paddingY={{ base: "50px", md: "80px" }} // Responsive padding
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                height="auto"  // Auto height to make it flexible
                alignSelf="stretch"
                background="#FFFFFF"
            >
                <Stack
                    justify="flex-start"
                    align="center"
                    spacing="50px"
                    width="100%"  // Takes full width but adapts to parent
                    maxWidth="690px"
                >
                    <Text
                        fontFamily="Inter"
                        fontWeight="bold"
                        fontSize={{ base: "36px", sm: "50px", md: "60px", lg: "70px" }}  // Responsive font size
                        color="#313131"
                        textAlign="center"
                    >
                        <span>Take attendance on your device </span>
                        <Box as="span" color="#7E3BB5">
                            Instantly
                        </Box>
                    </Text>
                    <Stack
                        justify="flex-start"
                        align="center"
                        spacing="30px"  // Reduce spacing for smaller screens
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
                            <Stack
                                paddingX="20px"
                                paddingY="20px"
                                borderRadius="10px"
                                direction="row"
                                justify="center"
                                align="center"
                                spacing="10px"
                                background="#7E3BB5"
                                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                            >
                                <Text
                                    fontFamily="Inter"
                                    fontWeight="semibold"
                                    fontSize={{ base: "20px", md: "26px" }}  // Responsive font size
                                    color="#FFFFFF"
                                    textAlign="center"
                                >
                                    Get Started ->
                                </Text>
                            </Stack>
                            <Stack
                                paddingX="20px"
                                paddingY="20px"
                                borderRadius="10px"
                                direction="row"
                                justify="center"
                                align="center"
                                spacing="10px"
                                background="#F9F9F9"
                                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                            >
                                <Text
                                    fontFamily="Inter"
                                    fontWeight="semibold"
                                    fontSize={{ base: "20px", md: "26px" }}  // Responsive font size
                                    color="#707070"
                                    textAlign="center"
                                >
                                    Learn More
                                </Text>
                            </Stack>
                        </Stack>
                        <Stack
                            paddingX="20px"
                            paddingY="20px"
                            borderRadius="10px"
                            justify="flex-start"
                            align="flex-start"
                            spacing="10px"
                            width="100%"
                            maxWidth="331px"
                            background="#EBECFF"
                            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                        >
                            <Stack direction="row" justify="flex-start" align="center" spacing="12px">
                                <Stack justify="flex-start" align="flex-start" spacing="0px">
                                    <Text
                                        fontFamily="Inter"
                                        fontWeight="semibold"
                                        fontSize="11px"
                                        color="#313131"
                                        alignSelf="stretch"
                                    >
                                        CSULA Software Award 🏅
                                    </Text>
                                    <Text
                                        fontFamily="Inter"
                                        fontWeight="semibold"
                                        fontSize="18px"
                                        color="#A15FDD"
                                        alignSelf="stretch"
                                    >
                                        Most Creative Project for Education
                                    </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Box height="1px" alignSelf="stretch" background="#D9D9D9" />
        </Stack>
    );
}
