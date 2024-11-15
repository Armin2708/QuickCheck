import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { TbClockUp } from "react-icons/tb";
import { LiaToolsSolid } from "react-icons/lia";
import { PiSmiley } from "react-icons/pi";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import TitleWrapper from "./TitleWrapper.jsx";
import TitleText from "./TitleText.jsx";
import TitleDescription from "./TitleDescription.jsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

export default function JoinQuickCheck() {
    const navigate = useNavigate();
    const { isUserAuthenticated } = useAuth();

    return (
        <Stack
            paddingY={{ base: "20px", md: "50px", lg: "100px" }} // Adjust padding for smaller screens
            paddingX={{ base: "20px", md: "50px", lg: "100px" }} // Adjust padding for smaller screens
            justify="flex-start"
            align="center"
            spacing="10px"
            width="100%"
            background="#FFFFFF"
        >
            <Stack
                justify="flex-start"
                align="center"
                spacing={{ base: "50px", md: "93px" }} // Adjust spacing for smaller screens
                width="100%"
                maxWidth="1059px"
            >
                {/* Header Section */}
                <TitleWrapper>
                    <TitleText>Join Quick Check</TitleText>
                    <TitleDescription>Start increasing your productivity today!</TitleDescription>
                </TitleWrapper>

                {/* Feature and Card Section */}
                <Stack
                    direction={{ base: "column", md: "row" }}
                    justify="center"
                    align="center"
                    spacing={{ base: "30px", md: "50px" }}
                    width="100%"
                >
                    {/* Features Section */}
                    <Stack
                        justify="flex-start"
                        align="flex-start"
                        spacing={{ base: "16px", sm: "20px" }} // Reduced spacing for smaller screens
                        width="100%"
                        maxWidth={{ base: "340px", sm: "467px" }} // Responsive max width
                    >
                        {["Speed up your meetings", "Best classroom toolbox", "Support Quick Check"].map((title, index) => (
                            <Stack
                                key={index}
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing="10px" // Reduced spacing between icon and text
                                width="100%"
                            >
                                <Box
                                    padding="8px" // Reduced padding for smaller screens
                                    borderRadius="5px"
                                    width="40px" // Reduced box width
                                    height="40px" // Reduced box height
                                    background="#7E3BB5"
                                    flexShrink={0} // Prevents the box from shrinking
                                >
                                    {index === 0
                                        ? <TbClockUp color="white" size="20px" /> // Reduced icon size
                                        : index === 1
                                            ? <LiaToolsSolid color="white" size="20px" />
                                            : <PiSmiley color="white" size="20px" />}
                                </Box>
                                <Stack spacing="4px" width="100%">
                                    <Text
                                        fontWeight="bold"
                                        fontSize={{ base: "16px", md: "20px" }} // Reduced font size
                                        color="#313131"
                                        textAlign="left"
                                        isTruncated // Prevents text from overflowing
                                    >
                                        {title}
                                    </Text>
                                    <Text
                                        fontWeight="semibold"
                                        fontSize={{ base: "12px", md: "14px" }} // Reduced font size
                                        color="#707070"
                                        textAlign="left"
                                        flexShrink={1} // Allows text to shrink to fit
                                    >
                                        {index === 0
                                            ? "With just one click, attend your meetings with ease and efficiency."
                                            : index === 1
                                                ? "No need to download 10 apps just to be equipped for class, everything is here."
                                                : "Every sign-up begins a trust relationship, supporting Quick Check."}
                                    </Text>
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>


                    {/* Pricing Card */}
                    <Stack
                        paddingY="20px"
                        paddingX="15px"
                        borderRadius="10px"
                        spacing="15px"
                        width="100%"
                        maxWidth={{ base: "340px", md: "489px" }}
                        background="#FBFBFB"
                        boxShadow="0px 1px 4px rgba(0, 0, 0, 0.25)"
                    >
                        <Stack spacing="15px" width="100%">
                            <Stack spacing="10px" width="100%">
                                <Stack direction="row" spacing="10px" justify="space-between" align="center">
                                    <Stack spacing="0px">
                                        <Text fontWeight="semibold" fontSize="20px" color="#313131">
                                            Basic
                                        </Text>
                                        <Text fontWeight="medium" fontSize="12px" color="#707070">
                                            With all features
                                        </Text>
                                    </Stack>
                                    <Stack direction="row" align="center" spacing="5px">
                                        <Text fontWeight="semibold" fontSize="36px" color="#313131">
                                            $10
                                        </Text>
                                        <Text fontWeight="medium" fontSize="12px" color="#707070">
                                            per user / month
                                        </Text>
                                    </Stack>
                                </Stack>

                                {/* Features Section */}
                                <Stack spacing="10px" width="100%">
                                    <Box height="1px" background="#EDEDED" />
                                    <Text fontWeight="semibold" fontSize="12px" color="#313131">
                                        FEATURES
                                    </Text>
                                    <Stack spacing="100px" direction="row">
                                        <Stack spacing="10px" direction="column">
                                            <Stack direction="row" spacing="6px" align="center">
                                                <IoMdCheckmarkCircleOutline color="#7E3BB5" />
                                                <Text fontWeight="medium" fontSize="12px" color="#707070">
                                                    Unlimited Classes
                                                </Text>
                                            </Stack>
                                            <Stack direction="row" spacing="6px" align="center">
                                                <IoMdCheckmarkCircleOutline color="#7E3BB5" />
                                                <Text fontWeight="medium" fontSize="12px" color="#707070">
                                                    Class Chats
                                                </Text>
                                            </Stack>
                                        </Stack>
                                        <Stack spacing="10px" direction="column">
                                            <Stack direction="row" spacing="6px" align="center">
                                                <IoMdCheckmarkCircleOutline color="#7E3BB5" />
                                                <Text fontWeight="medium" fontSize="12px" color="#707070">
                                                    Schedule Calendar
                                                </Text>
                                            </Stack>
                                            <Stack direction="row" spacing="6px" align="center">
                                                <IoMdCheckmarkCircleOutline color="#7E3BB5" />
                                                <Text fontWeight="medium" fontSize="12px" color="#707070">
                                                    Custom Reports
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Box height="1px" background="#EDEDED" />
                                </Stack>
                            </Stack>

                            {/* CTA Button */}
                            <Button
                                width="100%"
                                height="35px"
                                borderRadius="5px"
                                background="#7E3BB5"
                                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                                onClick={() => {
                                    isUserAuthenticated ? navigate("/dashboard") : navigate("/login");
                                }}
                            >
                                <Text fontWeight="medium" fontSize="14px" color="#F9F9F9">
                                    Start free trial
                                </Text>
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}

