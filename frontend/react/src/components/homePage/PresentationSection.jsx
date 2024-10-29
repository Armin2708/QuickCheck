import { Box, Text, Stack, Button } from "@chakra-ui/react";
import { LiaAwardSolid } from "react-icons/lia";
import PresentationButton from "./PresentationButton.jsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

export default function PresentationSection() {
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const {isUserAuthenticated} = useAuth()

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
                        lineHeight={"70px"}
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
                            <PresentationButton
                                width={"204px"}
                                height={"74px"}
                                color={"#7E3BB5"}
                                hoverColor={"#6C33A1"}
                                clickColor={"#6C33A1"}
                                handleNavigate={()=>{
                                    isUserAuthenticated ? navigate("/dashboard") :
                                        navigate("/login")
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
                            </PresentationButton>

                            {/* Learn More Button */}

                            <PresentationButton
                                width="204px"
                                height="74px"
                                color={"#F9F9F9"}
                                hoverColor={"#e2e2e2"}
                                clickColor={"#e2e2e2"}
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
                            </PresentationButton>
                        </Stack>

                        {/* Award Button */}

                        <PresentationButton
                            width="331px"
                            height="104px"
                            color={"#EBECFF"}
                            hoverColor={"#d8dafb"}
                            clickColor={"#d8dafb"}
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
                                        for education
                                    </Text>

                                </Stack>
                            </Stack>
                        </PresentationButton>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
