import {Box, Button, Card, Image, Input, Stack, Text} from "@chakra-ui/react";
import {FiCheckCircle} from "react-icons/fi";
import {IoMenu, IoWarningOutline} from "react-icons/io5";
import {FaCheck} from "react-icons/fa";
import {IoMdInformationCircleOutline} from "react-icons/io";
import AttendanceStudents from "../components/AttendanceStudents.jsx";
import {useEffect, useState} from "react";
import TitleText from "../components/TitleText.jsx";
import TitleDescription from "../components/TitleDescription.jsx";
import TitleWrapper from "../components/TitleWrapper.jsx";

const Navbar = ({colorTheme}) =>(
        <Stack
            paddingX="11px"
            paddingY="5px"
            borderRadius="10px"
            justify="center"  // Center vertically
            align="center"  // Align content horizontally
            spacing="10px"
            height="46px"
            alignSelf="stretch"
            background={colorTheme == "darkMode"? "#444343" : "#FFFFFF"}
            boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
        >
            <Stack
                direction="row"
                justify="space-between"
                align="center"
                width="100%"
                maxWidth="653px"
            >
                <Stack
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing="14px"
                >
                    {/* Icon Button */}
                    <Button
                        borderRadius="4px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="28px"   // Set explicit width
                        height="28px"  // Set explicit height to match width for square shape
                        background={colorTheme == "darkMode"? "#313131" : "#FBFBFB"}
                        padding="0"  // Remove padding to ensure square button
                        minWidth="28px"  // Ensure it doesn't shrink below 28px
                        minHeight="28px"  // Ensure it doesn't shrink below 28px
                    >
                        <IoMenu size="16px" color={colorTheme=="darkMode"? "#707070" : "#313131"} /> {/* Set icon size to fit */}
                    </Button>

                    {/* Text and Image Button */}
                    <Button
                        backgroundColor="transparent"
                        _hover={{
                            bg: "transparent",  // Keep background transparent on hover
                            color: "inherit"  // Maintain text color
                        }}
                        display="inline-flex"
                        alignItems="center"  // Align content vertically
                        padding="0"
                        width="auto"  // Make the button width automatic based on content
                    >
                        <Image
                            width="34.82px"
                            height="34.5px"
                            src={"./QuickCheckTransparent.png"}
                        />
                        <Text
                            fontFamily="Inter"
                            fontWeight="bold"
                            fontSize="26px"
                            color="#313131"
                            marginLeft="8px"  // Space between image and text
                            lineHeight="34.5px"  // Line height matches the image height
                        >
                            Quick Check
                        </Text>
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );

const CardWrapper = ({children,colorTheme}) =>(
    <Stack
        paddingX="12px"
        paddingY="13px"
        borderRadius="10px"
        justify="flex-start"
        align="flex-start"
        spacing="10px"
        width="702px"
        height="689px"
        maxWidth="100%"
        background={colorTheme == "darkMode"? "#313131" : "#F9F9F9"}
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
    >
        {children}
    </Stack>
);

export default function SneakPeek() {
    const [randomCode, setRandomCode] = useState("");
    const [inputCode, setInputCode] = useState(""); // To store the input code
    const [isValid, setIsValid] = useState(null);  // To store if the code is valid or not

    // Generate a random 6-digit code when the component mounts
    useEffect(() => {
        const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate random 6-digit code
        setRandomCode(code);
    }, []);
    return (
        <Stack
            paddingX={{ base: "20px", md: "50px", lg: "54px" }}  // Responsive padding
            justify="flex-end"
            align="center"
            spacing="10px"
            width="100%"  // Full width for responsiveness
            maxWidth="100%"
            height="auto"  // Make the height flexible
            background="#FFFFFF"
        >
            <Stack
                justify="flex-start"
                align="center"
                spacing="56px"
                width="100%"
                maxWidth="1404px"
            >
                {/* Header Section */}
                <TitleWrapper>
                    <TitleText>
                        Less waste. More
                        <Box as="span" color="#7E3BB5">
                            {" speed"}
                        </Box>
                    </TitleText>
                    <TitleDescription
                    >
                        Spend less time doing attendance and more time teaching class
                    </TitleDescription>
                </TitleWrapper>

                {/* Attendance Section */}
                <Stack
                    direction={{ base: "column", lg: "row" }}  // Responsive direction
                    justify="center"
                    align="center"
                    width="100%"
                    maxWidth="100%"
                >

                    <CardWrapper colorTheme={"lightMode"}>
                        <Stack
                            paddingY="0px"
                            justify="flex-start"
                            align="center"
                            spacing="33px"
                            width={"100%"}
                            background={"#FBFBFB"}
                        >
                            {/* Nav Bar */}
                            <Navbar colorTheme={"lightmode"}/>

                            <Stack
                                paddingX="20px"
                                paddingY="10px"
                                borderRadius="10px"
                                justify="flex-start"
                                align="flex-start"
                                spacing="5px"
                                width="326px"
                                height="137px"
                                maxWidth="100%"
                                background="#FFFFFF"
                                boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                            >
                                <Stack
                                    direction="row"
                                    justify="flex-start"
                                    align="flex-start"
                                    spacing="5px"
                                >
                                    <Stack
                                        justify="center"
                                        align="flex-start"
                                        spacing="5px"
                                        height="121px"
                                    >
                                        <Stack
                                            justify="flex-start"
                                            align="center"
                                            spacing="5px"
                                            width="280px"
                                        >
                                            <Stack
                                                justify="flex-start"
                                                align="flex-start"
                                                spacing="4px"
                                                alignSelf="stretch"
                                                alignContent={"center"}
                                            >
                                                <Text
                                                    fontFamily="Inter"
                                                    fontWeight="medium"
                                                    fontSize="20px"
                                                    color="#313131"
                                                    alignSelf="stretch"
                                                >
                                                    CS 3337 - Prof. Abalos
                                                </Text>
                                                <Box
                                                    fontFamily="Inter"
                                                    fontWeight="medium"
                                                    fontSize="18px"
                                                    color="#313131"
                                                    alignSelf="stretch"
                                                >
                                                    Friday 10/15
                                                    <Stack direction={"row"}>
                                                        <Text>
                                                            Code :
                                                        </Text>
                                                        <Text as="span" fontWeight="bold" color="#7E3BB5">
                                                            {randomCode}  {/* Display the generated random code */}
                                                        </Text>
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                            <Button
                                                paddingX="7px"
                                                paddingY="8px"
                                                borderRadius="8px"
                                                direction="row"
                                                justify="center"
                                                align="center"
                                                spacing="10px"
                                                width="153px"
                                                height="38px"
                                                background="#7E3BB5"
                                                boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                            >
                                                <Text
                                                    fontFamily="Inter"
                                                    fontWeight="medium"
                                                    fontSize="18px"
                                                    color="#FFFFFF"
                                                >
                                                    End Attendance
                                                </Text>
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <AttendanceStudents />
                        </Stack>
                    </CardWrapper>

                    {/* Right Card */}
                    <CardWrapper colorTheme={"darkMode"}>
                        <Stack
                            justify="flex-start"
                            align="center"
                            spacing="32px"
                            width="675px"
                            maxWidth="100%"
                        >
                            <Navbar colorTheme={"darkMode"}/>

                            <Stack
                                justify="flex-start"
                                align="center"
                                spacing="33px"
                                width="564px"
                                maxWidth="100%"
                            >
                                <Stack
                                    paddingX="38px"
                                    paddingY="31px"
                                    borderRadius="10px"
                                    justify="flex-start"
                                    align="flex-start"
                                    spacing="10px"
                                    width="324px"
                                    height="135px"
                                    maxWidth="100%"
                                    background="#444343"
                                    boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                                >
                                    <Stack
                                        direction="row"
                                        justify="flex-start"
                                        align="flex-start"
                                        spacing="13px"
                                    >
                                        <Stack
                                            justify="flex-start"
                                            align="flex-start"
                                            spacing="4px"
                                            width="218px"
                                        >
                                            <Text
                                                fontFamily="Inter"
                                                fontWeight="medium"
                                                fontSize="20px"
                                                color="#707070"
                                                alignSelf="stretch"
                                            >
                                                CS 3337 - Prof. Abalos
                                            </Text>
                                            <Text
                                                fontFamily="Inter"
                                                fontWeight="medium"
                                                fontSize="18px"
                                                color="#707070"
                                                alignSelf="stretch"
                                            >
                                                Friday 10/15
                                                <br/>
                                                Class location : FA 218
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack
                                    justify="flex-start"
                                    align="center"
                                    spacing="48px"
                                    alignSelf="stretch"
                                >
                                    <Stack
                                        direction="row"
                                        justify="flex-start"
                                        align="center"
                                        spacing="26px"
                                        alignSelf="stretch"
                                    >
                                        <Stack
                                            paddingX="34px"
                                            paddingY="12px"
                                            borderRadius="10px"
                                            justify="flex-start"
                                            align="flex-start"
                                            spacing="10px"
                                            width="269px"
                                            height="170px"
                                            maxWidth="100%"
                                            background="#444343"
                                            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                                        >
                                            <Stack
                                                justify="flex-start"
                                                align="center"
                                                spacing="16px"
                                                width="200px"
                                            >
                                                <Text
                                                    fontFamily="Inter"
                                                    fontWeight="semibold"
                                                    fontSize="45px"
                                                    color="#707070"
                                                    height="47px"
                                                    alignSelf="stretch"
                                                    textAlign="center"
                                                >
                                                    Location
                                                </Text>
                                                <Button
                                                    paddingX="18px"
                                                    paddingY="7px"
                                                    borderRadius="8px"
                                                    direction="row"
                                                    justify="center"
                                                    align="center"
                                                    spacing="10px"
                                                    width="154px"
                                                    height="38px"
                                                    background="#7E3BB5"
                                                    boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                                >
                                                    <Text
                                                        fontFamily="Inter"
                                                        fontWeight="medium"
                                                        fontSize="20px"
                                                        color="#313131"
                                                        textAlign="center"
                                                    >
                                                        Get location
                                                    </Text>
                                                </Button>
                                                <Stack
                                                    direction="row"
                                                    justify="flex-start"
                                                    align="center"
                                                    spacing="7px"
                                                >
                                                    <Text
                                                        fontFamily="Inter"
                                                        fontWeight="medium"
                                                        fontSize="18px"
                                                        color="#707070"
                                                    >
                                                        My location
                                                    </Text>
                                                    <FiCheckCircle size={"23px"} color={"#7E3BB5"} />
                                                </Stack>

                                            </Stack>
                                        </Stack>
                                        <Stack
                                            paddingX="34px"
                                            paddingY="12px"
                                            borderRadius="10px"
                                            justify="flex-start"
                                            align="flex-start"
                                            spacing="10px"
                                            width="269px"
                                            height="170px"
                                            maxWidth="100%"
                                            background="#444343"
                                            boxShadow="0px 1px 4px 0px rgba(0, 0, 0, 0.25)"
                                        >
                                            <Stack
                                                justify="flex-start"
                                                align="center"
                                                spacing="16px"
                                                width="200px"
                                            >
                                                <Text
                                                    fontFamily="Inter"
                                                    fontWeight="semibold"
                                                    fontSize="45px"
                                                    color="#707070"
                                                    height="47px"
                                                    alignSelf="stretch"
                                                    textAlign="center"
                                                >
                                                    Code
                                                </Text>
                                                <Stack
                                                    direction="row"
                                                    justify="flex-start"
                                                    align="center"
                                                    spacing="6px"
                                                    alignSelf="stretch"
                                                >
                                                        <Input
                                                            type="text"
                                                            maxLength={6}
                                                            value={inputCode}
                                                            onChange={(e) => {
                                                                if (/^\d*$/.test(e.target.value)) { // Ensure only digits
                                                                    setInputCode(e.target.value);
                                                                }
                                                            }}
                                                            paddingX="35px"
                                                            borderRadius="4px"
                                                            direction="row"
                                                            justify="center"
                                                            align="center"
                                                            spacing="10px"
                                                            width="154px"
                                                            height="38px"
                                                            textAlign="center"
                                                            background="#707070"
                                                            color="#313131"
                                                            fontWeight="medium"
                                                            fontSize="20px"
                                                            boxShadow="inset 1px 1px 2px 1px rgba(0, 0, 0, 0.12)"
                                                            placeholder={"123456"}
                                                            border="none"  // Remove default border
                                                            _focus={{
                                                                outline: "none",  // Remove default outline
                                                                boxShadow: "0px 0px 0px 2px #7E3BB5",  // Custom focus shadow
                                                                border: "none",  // Ensure no border on focus
                                                            }}
                                                        >

                                                        </Input>
                                                    <Button
                                                        paddingX="9px"
                                                        paddingY="11px"
                                                        borderRadius="8px"
                                                        justify="flex-start"
                                                        align="flex-start"
                                                        spacing="10px"
                                                        width="38px"
                                                        height="38px"
                                                        background="#7E3BB5"
                                                        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                                        onClick={() => setIsValid(inputCode === randomCode)}
                                                    >
                                                        <FaCheck color="#313131" size={"100%"} />
                                                    </Button>
                                                </Stack>
                                                <Stack
                                                    direction="row"
                                                    justify="flex-start"
                                                    align="center"
                                                    spacing="7px"
                                                >
                                                    <Text
                                                        fontFamily="Inter"
                                                        fontWeight="medium"
                                                        fontSize="18px"
                                                        color="#707070"
                                                    >
                                                        {isValid === null ? "Enter Code" : isValid ? "Valid Code" : "Invalid Code"}
                                                    </Text>
                                                    {isValid === true ? <FiCheckCircle size={"23px"} color={"#7E3BB5"} />
                                                        : isValid === false ? <IoWarningOutline size="23px" color="#7E3BB5" /> : null}
                                                </Stack>

                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        justify="flex-start"
                                        align="center"
                                        spacing="9px"
                                        width="269px"
                                        maxWidth="100%"
                                    >
                                        <Text
                                            fontFamily="Inter"
                                            fontWeight="semibold"
                                            fontSize="36px"
                                            color="#707070"
                                            height="47px"
                                            alignSelf="stretch"
                                            textAlign="center"
                                        >
                                            John Doe
                                        </Text>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </CardWrapper>

                </Stack>
            </Stack>
        </Stack>
    );
}
