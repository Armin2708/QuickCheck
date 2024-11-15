import {Box, Button, Card, Image, Input, Spacer, Stack, Text} from "@chakra-ui/react";
import {FiCheckCircle, FiUser} from "react-icons/fi";
import {IoMenu, IoWarningOutline} from "react-icons/io5";
import {FaCheck} from "react-icons/fa";
import {IoMdInformationCircleOutline} from "react-icons/io";
import AttendanceStudents from "./AttendanceStudents.jsx";
import {useEffect, useState} from "react";
import TitleText from "./TitleText.jsx";
import TitleDescription from "./TitleDescription.jsx";
import TitleWrapper from "./TitleWrapper.jsx";
import {useMediaQuery} from "react-responsive";

const Navbar = ({ colorTheme }) => (
    <Stack
        paddingX="11px"
        paddingY="5px"
        borderRadius="10px"
        justify="flex-start"
        align="center"
        direction="row"
        background={colorTheme === "darkMode" ? "#444343" : "#FFFFFF"}
        boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
        width="100%"
    >
        <Button
            borderRadius="4px"
            width="28px"
            height="28px"
            background={colorTheme === "darkMode" ? "#313131" : "#FBFBFB"}
            padding="0"
        >
            <IoMenu size="16px" color={colorTheme === "darkMode" ? "#707070" : "#313131"} />
        </Button>
        <Button
            backgroundColor="transparent"
            _hover={{ bg: "transparent" }}
            display="flex"
            alignItems="center"
            padding="0"
        >
            <Image width="35px" height="35px" src="./QuickCheckTransparent.png" />
            <Text fontWeight="bold" fontSize="26px" color="#313131" marginLeft="8px">
                Quick Check
            </Text>
        </Button>
    </Stack>
);

const Header = () => (
    <TitleWrapper>
        <TitleText>
            Less waste. More
            <Box as="span" color="#7E3BB5">
                {" speed"}
            </Box>
        </TitleText>
        <TitleDescription>
            Spend less time doing attendance and more time teaching class
        </TitleDescription>
    </TitleWrapper>
);

const CardWrapper = ({ children, colorTheme, spacing ="30px" }) => (
    <Stack
        padding="12px"
        borderRadius="10px"
        spacing={spacing}
        width="100%"
        height={"100%"}
        maxWidth={"720px"}
        maxHeight={"640px"}
        background={colorTheme === "darkMode" ? "#313131" : "#F9F9F9"}
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        align="center" // Aligns children horizontally to the center
        justify="center" // Centers children vertically (if the parent has height)
    >
        {children}
    </Stack>
);


const LeftCard = ({ randomCode }) => (
    <CardWrapper colorTheme="lightMode">
        <Navbar colorTheme="lightMode" />
        <Stack
            padding="15px"
            borderRadius="10px"
            spacing="5px"
            background="#FFFFFF"
            boxShadow="0px 1px 4px rgba(0, 0, 0, 0.25)"
            direction="column"
            align="center"
            justify="space-between"
            maxWidth={"300px"}
        >
                <Text fontWeight="medium" fontSize="20px" color="#313131">
                    CS 3337 - Prof. Pym
                </Text>
                <Box fontSize="18px" color="#313131">
                    Friday 10/15
                    <Stack direction="row">
                        <Text>Code:</Text>
                        <Text as="span" fontWeight="bold" color="#7E3BB5">
                            {randomCode}
                        </Text>
                    </Stack>
                </Box>
                <Button
                    borderRadius="8px"
                    width="153px"
                    height="38px"
                    background="#7E3BB5"
                    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                >
                    <Text fontWeight="medium" fontSize="18px" color="#FFFFFF">
                        End Attendance
                    </Text>
                </Button>
        </Stack>
        <AttendanceStudents />
    </CardWrapper>
);

const RightCard = ({ inputCode, setInputCode, isValid, setIsValid }) => {
    // Define breakpoints for responsive icon size
    const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
    const isMediumScreen = useMediaQuery({ query: "(min-width: 601px) and (max-width: 1024px)" });
    const iconSize = isSmallScreen ? 40 : isMediumScreen ? 60 : 80;

    return (
        <CardWrapper colorTheme="darkMode" spacing={"20px"}>
            <Navbar colorTheme="darkMode" />
            <Stack
                padding="15px"
                borderRadius="10px"
                spacing="5px"
                background="#444343"
                boxShadow="0px 1px 4px rgba(0, 0, 0, 0.25)"
                maxWidth={"300px"}
            >
                <Text fontWeight="medium" fontSize="20px" color="#707070">
                    CS 3337 - Prof. Pym
                </Text>
                <Text fontWeight="medium" fontSize="18px" color="#707070">
                    Friday 10/15
                    <br />
                    Class location: FA 218
                </Text>
            </Stack>
            <Stack
                direction={{ base: "column", lg: "row" }} // Stack vertically on small screens, horizontally on large screens
                spacing="10px"
                width="100%" // Optional: Ensures full width
                align="center" // Align items to the center
                justify="center"
            >
                {/* Location Card */}
                <Stack
                    paddingY="15px"
                    paddingX="20px"
                    borderRadius="10px"
                    spacing="10px"
                    background="#444343"
                    boxShadow="0px 1px 4px rgba(0, 0, 0, 0.25)"
                    align="center"
                    width="250px" // Optional: Ensures consistent width
                >
                    <Text fontWeight="semibold" fontSize="30px" color="#707070" lineHeight={"30px"} >
                        Location
                    </Text>
                    <Button
                        paddingX="18px"
                        paddingY="7px"
                        borderRadius="8px"
                        width="154px"
                        height="38px"
                        background="#7E3BB5"
                    >
                        <Text fontWeight="medium" fontSize="20px" color="#313131">
                            Get location
                        </Text>
                    </Button>
                    <Stack direction="row" spacing="7px" align="center">
                        <Text fontWeight="medium" fontSize="18px" color="#707070">
                            My location
                        </Text>
                        <FiCheckCircle size="23px" color="#7E3BB5" />
                    </Stack>
                </Stack>

                {/* Code Card */}
                <Stack
                    paddingY="15px"
                    paddingX="20px"
                    borderRadius="10px"
                    spacing="10px"
                    background="#444343"
                    boxShadow="0px 1px 4px rgba(0, 0, 0, 0.25)"
                    align="center"
                    width="250px" // Optional: Ensures consistent width
                >
                    <Text fontWeight="semibold" fontSize="30px" color="#707070" lineHeight={"30px"} >
                        Code
                    </Text>
                    <Stack direction="row" spacing="6px">
                        <Input
                            type="text"
                            maxWidth="130px"
                            value={inputCode}
                            onChange={(e) =>
                                /^\d*$/.test(e.target.value) && setInputCode(e.target.value)
                            }
                            textAlign="center"
                            background="#707070"
                            color="#313131"
                            fontSize="20px"
                            placeholder="123456"
                            border="none"
                            _focus={{
                                boxShadow: "0px 0px 0px 2px #7E3BB5",
                            }}
                        />
                        <Button
                            width="38px"
                            height="38px"
                            borderRadius="8px"
                            background="#7E3BB5"
                            onClick={() => setIsValid(inputCode === "123456")}
                        >
                            <FaCheck color="#313131" size="10px" />
                        </Button>
                    </Stack>
                    <Stack direction="row" spacing="7px" align="center">
                        <Text fontSize="18px" color="#707070">
                            {isValid === null
                                ? "Enter Code"
                                : isValid
                                    ? "Valid Code"
                                    : "Invalid Code"}
                        </Text>
                        {isValid === true && <FiCheckCircle size="23px" color="#7E3BB5" />}
                        {isValid === false && (
                            <IoWarningOutline size="23px" color="#7E3BB5" />
                        )}
                    </Stack>
                </Stack>
            </Stack>

            <Spacer/>

            <Stack align="center">
                <FiUser size={iconSize} /> {/* Responsive icon size */}
                <Text fontWeight="semibold" fontSize="30px" color="#707070" lineHeight={"30px"} >
                    John Doe
                </Text>
            </Stack>
        </CardWrapper>
    );
};


export default function SneakPeek() {
    const [randomCode, setRandomCode] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        setRandomCode(Math.floor(100000 + Math.random() * 900000).toString());
    }, []);

    return (
        <Stack
            paddingX={{ base: "20px", lg: "54px" }}
            spacing="10px"
            width="100%"
            align="center" // Centers the entire layout horizontally
            justify="center" // Centers the entire layout horizontally
        >
            <Header />
            <Stack
                direction={{ base: "column", lg: "row" }}
                justify="center" // Centers the cards in the row direction
                spacing="10px"
                width="100%" // Full width for proper centering
            >
                {/* Ensure consistent card dimensions */}
                <Stack width="100%">
                    <LeftCard randomCode={randomCode} />
                </Stack>
                <Stack width="100%" >
                    <RightCard
                        inputCode={inputCode}
                        setInputCode={setInputCode}
                        isValid={isValid}
                        setIsValid={setIsValid}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}
