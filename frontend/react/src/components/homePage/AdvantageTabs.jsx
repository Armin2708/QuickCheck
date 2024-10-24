import {Box, Button, Icon, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import {FiThumbsUp} from "react-icons/fi";
import {LuPen} from "react-icons/lu";
import {RiShare2Line} from "react-icons/ri";
import TitleWrapper from "./TitleWrapper.jsx";
import TitleText from "./TitleText.jsx";
import TitleDescription from "./TitleDescription.jsx";

export default function AdvantageTabs() {
    const [tab,setTab]=useState(1)
    const handleTab = (buttonId) => {
        setTab(buttonId);
    }
    return (
        <Stack
            paddingX={{ base: "20px", md: "50px", lg: "324px" }}  // Responsive padding
            paddingY={{ base: "40px", md: "70px", lg: "100px" }}  // Responsive padding
            justify="flex-start"
            align="center"
            spacing="10px"
            width="100%"  // Full width for responsiveness
            background="#F9F9F9"
        >
            <Stack
                justify="flex-start"
                align="center"
                spacing="25px"
                width="100%"  // Full width for responsiveness
                maxWidth="864px"  // Limit max width
            >
                {/* Header Section */}
                <TitleWrapper>
                    <TitleText>
                        An innovating experience that’d fit your need
                    </TitleText>
                    <TitleDescription>
                        Designed to fit your needs
                    </TitleDescription>
                </TitleWrapper>

                {/* Buttons Section */}
                <Stack
                    direction={{ base: "column", md: "row" }}  // Stack vertically on small screens
                    paddingTop={"40px"}
                    justify="center"
                    align="center"
                    spacing="20px"  // Adjust spacing between buttons
                    width="100%"  // Full width for responsiveness
                    maxWidth="100%"  // Prevent buttons from shrinking too much
                >
                    <Button
                        paddingX="58px"
                        paddingY="29px"
                        borderRadius="10px"
                        width={{ base: "100%", md: "224px" }}  // Full width on small, fixed on large
                        height="90px"  // Fixed height for all screen sizes
                        background={tab==1 ?"#BF9BE6":"#7E3BB5"}
                        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                        fontFamily="Inter"
                        fontWeight="semibold"
                        fontSize="26px"
                        color="#FFFFFF"
                        textAlign="center"
                        _hover={{ background: tab==1 ?"#BF9BE6":"#6C33A1"}}  // Hover effect
                        _active={{
                            transform: "scale(0.95)",  // Scale down a bit on click
                            background: "#BF9BE6",  // Change background when active
                        }}
                        transition="all 0.1s ease-in-out"  // Smooth transition for both hover and active states
                        onClick={() => handleTab(1)}
                    >
                        Simple
                    </Button>
                    <Button
                        paddingX="58px"
                        paddingY="24px"
                        borderRadius="10px"
                        width={{ base: "100%", md: "224px" }}  // Full width on small, fixed on large
                        height="90px"  // Fixed height for all screen sizes
                        background={tab==2 ?"#BF9BE6":"#7E3BB5"}
                        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                        fontFamily="Inter"
                        fontWeight="semibold"
                        fontSize="26px"
                        color="#FFFFFF"
                        textAlign="center"
                        _hover={{ background: tab==2 ?"#BF9BE6":"#6C33A1"}}  // Hover effect
                        _active={{
                            transform: "scale(0.95)",  // Scale down a bit on click
                            background: "#BF9BE6",  // Change background when active
                        }}
                        transition="all 0.1s ease-in-out"  // Smooth transition for both hover and active states
                        onClick={() => handleTab(2)}
                    >
                        Customizable
                    </Button>
                    <Button
                        paddingX="39px"
                        paddingY="21px"
                        borderRadius="10px"
                        width={{ base: "100%", md: "224px" }}  // Full width on small, fixed on large
                        height="90px"  // Fixed height for all screen sizes
                        background={tab==3 ?"#BF9BE6":"#7E3BB5"}
                        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                        fontFamily="Inter"
                        fontWeight="semibold"
                        fontSize="26px"
                        color="#FFFFFF"
                        textAlign="center"
                        _hover={{ background: tab==3 ?"#BF9BE6":"#6C33A1"}}  // Hover effect
                        _active={{
                            transform: "scale(0.95)",  // Scale down a bit on click
                            background: "#BF9BE6",  // Change background when active
                        }}
                        transition="all 0.1s ease-in-out"  // Smooth transition for both hover and active states
                        onClick={() => handleTab(3)}
                    >
                        Exportable
                    </Button>
                </Stack>

                {/* Card Section */}

                <Stack
                    paddingX="49px"
                    paddingY="39px"
                    borderRadius="15px"
                    justify="flex-start"
                    align="flex-start"
                    spacing="10px"
                    width="734px"
                    height="359px"
                    maxWidth="100%"
                    background="#FFFFFF"
                    boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                >
                    <Stack
                        justify="flex-start"
                        align="flex-start"
                        spacing="39px"
                        width="630px"
                        maxWidth="100%"
                    >
                        <Stack
                            direction="row"
                            justify="flex-start"
                            align="center"
                            spacing="57px"
                            alignSelf="stretch"
                        >
                            <Box
                                paddingX="35px"
                                paddingY="32px"
                                borderRadius="63.5px"
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing="10px"
                                width="127px"
                                height="127px"
                                background="#7E3BB5"
                            >
                                {tab==1 ?<FiThumbsUp color={"white"} size={"100%"}/>
                                    : (tab==2 ? <LuPen color={"white"} size={"100%"}/>
                                        : <RiShare2Line color={"white"} size={"100%"}/>)}
                            </Box>
                            <Text
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="32px"
                                color="#313131"
                                width="446px"
                                height="79px"
                                maxWidth="100%"
                            >
                                {tab==1 ? "Intuitive design to maximize your output"
                                    : (tab==2 ? "Customize your experience "
                                        :"Export your data to other platforms")}
                            </Text>
                        </Stack>
                        <Text
                            fontFamily="Inter"
                            lineHeight="1.58"
                            fontWeight="semibold"
                            fontSize="24px"
                            color="#707070"
                            height="111px"
                            alignSelf="stretch"
                        >
                            {tab==1 ?"Quick Check UI has been engineered to be as intuitive as " +
                                "possible for you to enjoy the simple but efficient experience."
                                : (tab==2 ? "Quick Check lets you customize your experience to " +
                                    "better match your specific need."
                                    :"Quick Check datas can be exported to other platforms \n" +
                                    "to help you better fit your need.")}
                        </Text>
                    </Stack>
                </Stack>

            </Stack>
        </Stack>
    );
}
