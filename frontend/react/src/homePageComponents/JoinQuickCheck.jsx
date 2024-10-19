import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { TbClockUp } from "react-icons/tb";
import { LiaToolsSolid } from "react-icons/lia";
import { PiSmiley } from "react-icons/pi";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";

export default function JoinQuickCheck() {
    return (
        <Stack
            paddingX={{ base: "20px", md: "50px", lg: "100px" }}  // Responsive padding
            paddingY={{ base: "50px", md: "100px", lg: "150px" }}  // Responsive padding
            justify="flex-start"
            align="center"
            spacing="10px"
            width="100%"  // Full width for responsiveness
            background="#FFFFFF"
        >
            <Stack
                justify="flex-start"
                align="center"
                spacing="93px"
                width="100%"  // Full width for responsiveness
                maxWidth="1059px"
            >
                {/* Header Section */}
                <Stack
                    justify="flex-start"
                    align="center"
                    spacing="20px"
                    width="100%"
                    maxWidth="822px"
                >
                    <Text
                        fontFamily="Inter"
                        fontWeight="bold"
                        fontSize={{ base: "36px", md: "50px", lg: "65px" }}  // Responsive font size
                        color="#313131"
                        textAlign="center"
                    >
                        Join Quick Check
                    </Text>
                    <Text
                        fontFamily="Inter"
                        fontWeight="medium"
                        fontSize={{ base: "18px", md: "20px", lg: "24px" }}  // Responsive font size
                        color="#707070"
                        textAlign="center"
                    >
                        Start increasing your productivity today!
                    </Text>
                </Stack>

                {/* Feature and Card Section */}
                <Stack
                    direction={{ base: "column", md: "row" }}  // Stack vertically on small screens
                    justify="space-between"
                    align="center"
                    spacing={{ base: "50px", md: "100px" }}  // Adjust spacing for small screens
                    width="100%"
                >
                    {/* Features Section */}
                    <Stack
                        justify="flex-start"
                        align="flex-start"
                        spacing="39px"
                        width="100%"  // Full width
                        maxWidth="467px"
                    >
                        {["Speed up your meetings", "Best classroom toolbox", "Support Quick Check"].map((title, index) => (
                            <Stack
                                key={index}
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing="11px"
                                width="100%"
                            >
                                <Box
                                    padding="13px"
                                    borderRadius="5px"
                                    width="60px"  // Increased width for icon box
                                    height="60px"  // Increased height for icon box
                                    background="#7E3BB5"
                                >
                                    {index === 0
                                        ? <TbClockUp color={"white"} size={"35px"}/>  // Set icon size
                                        : index === 1
                                            ? <LiaToolsSolid color={"white"} size={"35px"}/>  // Set icon size
                                            : <PiSmiley color={"white"} size={"35px"}/>  // Set icon size
                                    }
                                </Box>
                                <Stack
                                    justify="flex-start"
                                    align="flex-start"
                                    spacing="4px"
                                    width="100%"
                                    maxWidth="409px"
                                >
                                    <Text
                                        fontFamily="Inter"
                                        fontWeight="bold"
                                        fontSize="24px"
                                        color="#313131"
                                        textAlign="left"
                                    >
                                        {title}
                                    </Text>
                                    <Text
                                        fontFamily="Inter"
                                        lineHeight="1.38"
                                        fontWeight="semibold"
                                        fontSize="16px"
                                        color="#707070"
                                        textAlign="left"
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
                    <Stack
                        paddingY="31px"
                        borderRadius="15px"
                        justify="flex-start"
                        align="flex-start"
                        spacing="10px"
                        width="489px"
                        height="352px"
                        maxWidth="100%"
                        background="#FBFBFB"
                        boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                    >
                        <Stack
                            justify="flex-start"
                            align="center"
                            spacing="27px"
                            width="489px"
                            maxWidth="100%"
                        >
                            <Stack
                                justify="flex-start"
                                align="center"
                                spacing="19px"
                                alignSelf="stretch"
                            >
                                <Stack
                                    direction="row"
                                    justify="flex-start"
                                    align="center"
                                    spacing="101px"
                                >
                                    <Stack
                                        justify="flex-start"
                                        align="flex-start"
                                        spacing="0px"
                                        width="133px"
                                    >
                                        <Text
                                            fontFamily="Inter"
                                            fontWeight="semibold"
                                            fontSize="24px"
                                            color="#313131"
                                            height="30px"
                                            alignSelf="stretch"
                                        >
                                            Basic
                                        </Text>
                                        <Text
                                            fontFamily="Inter"
                                            lineHeight="1.57"
                                            fontWeight="medium"
                                            fontSize="14px"
                                            color="#707070"
                                            height="29px"
                                            alignSelf="stretch"
                                        >
                                            With all features
                                        </Text>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justify="flex-start"
                                        align="center"  // Aligns items vertically in the center
                                        spacing="0px"
                                    >
                                        <Text
                                            fontFamily="Inter"
                                            fontWeight="semibold"
                                            fontSize="45px"
                                            color="#313131"
                                            width="85px"
                                        >
                                            $10
                                        </Text>
                                        <Text
                                            fontFamily="Inter"
                                            lineHeight="1.57"
                                            fontWeight="medium"
                                            fontSize="14px"
                                            color="#707070"
                                            width="113px"
                                        >
                                            per user / month
                                        </Text>
                                    </Stack>

                                </Stack>
                                <Stack
                                    justify="flex-start"
                                    align="center"
                                    spacing="29px"
                                    alignSelf="stretch"
                                >
                                    <Box height="1px" alignSelf="stretch" background="#EDEDED" />
                                    <Stack
                                        justify="flex-start"
                                        align="flex-end"
                                        spacing="21px"
                                        width="393.25px"
                                        maxWidth="100%"
                                    >
                                        <Text
                                            fontFamily="Inter"
                                            fontWeight="semibold"
                                            fontSize="14px"
                                            color="#313131"
                                            height="18px"
                                            alignSelf="stretch"
                                        >
                                            FEATURES
                                        </Text>
                                        <Stack
                                            justify="flex-start"
                                            align="flex-start"
                                            spacing="15px"
                                            width="376px"
                                            maxWidth="100%"
                                        >
                                            <Stack
                                                direction="row"
                                                justify="flex-start"
                                                align="center"
                                                spacing="73px"
                                                alignSelf="stretch"
                                            >
                                                <Stack
                                                    direction="row"
                                                    justify="flex-start"
                                                    align="center"
                                                    spacing="6px"
                                                >
                                                    <IoMdCheckmarkCircleOutline color={"#7E3BB5"}/>
                                                    <Text
                                                        fontFamily="Inter"
                                                        lineHeight="1.57"
                                                        fontWeight="medium"
                                                        fontSize="14px"
                                                        color="#707070"
                                                        width="133px"
                                                        height="18px"
                                                    >
                                                        With all features
                                                    </Text>
                                                </Stack>
                                                <Stack
                                                    direction="row"
                                                    justify="flex-start"
                                                    align="center"
                                                    spacing="6px"
                                                >
                                                    <IoMdCheckmarkCircleOutline color={"#7E3BB5"}/>
                                                    <Text
                                                        fontFamily="Inter"
                                                        lineHeight="1.57"
                                                        fontWeight="medium"
                                                        fontSize="14px"
                                                        color="#707070"
                                                        width="133px"
                                                        height="18px"
                                                    >
                                                        With all features
                                                    </Text>
                                                </Stack>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                justify="flex-start"
                                                align="center"
                                                spacing="73px"
                                                alignSelf="stretch"
                                            >
                                                <Stack
                                                    direction="row"
                                                    justify="flex-start"
                                                    align="center"
                                                    spacing="6px"
                                                >
                                                    <IoMdCheckmarkCircleOutline color={"#7E3BB5"}/>

                                                    <Text
                                                        fontFamily="Inter"
                                                        lineHeight="1.57"
                                                        fontWeight="medium"
                                                        fontSize="14px"
                                                        color="#707070"
                                                        width="133px"
                                                        height="18px"
                                                    >
                                                        With all features
                                                    </Text>
                                                </Stack>
                                                <Stack
                                                    direction="row"
                                                    justify="flex-start"
                                                    align="center"
                                                    spacing="6px"
                                                >
                                                    <IoMdCheckmarkCircleOutline color={"#7E3BB5"}/>

                                                    <Text
                                                        fontFamily="Inter"
                                                        lineHeight="1.57"
                                                        fontWeight="medium"
                                                        fontSize="14px"
                                                        color="#707070"
                                                        width="133px"
                                                        height="18px"
                                                    >
                                                        With all features
                                                    </Text>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Box height="1px" alignSelf="stretch" background="#EDEDED" />
                                </Stack>
                            </Stack>
                            <Button
                                paddingX="160px"
                                paddingY="7px"
                                borderRadius="5px"
                                direction="row"
                                justify="center"
                                align="center"
                                spacing="10px"
                                width="428px"
                                height="35px"
                                maxWidth="100%"
                                background="#7E3BB5"
                                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                            >
                                <Text
                                    fontFamily="Inter"
                                    fontWeight="medium"
                                    fontSize="16px"
                                    color="#F9F9F9"
                                    textAlign="center"
                                >
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
