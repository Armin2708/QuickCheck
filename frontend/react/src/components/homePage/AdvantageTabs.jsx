import {Box, Button, Icon, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import {FiThumbsUp} from "react-icons/fi";
import {LuPen} from "react-icons/lu";
import {RiShare2Line} from "react-icons/ri";
import TitleWrapper from "./components/TitleWrapper.jsx";
import TitleText from "./components/TitleText.jsx";
import TitleDescription from "./components/TitleDescription.jsx";

export default function AdvantageTabs() {
    const [tab, setTab] = useState(1);

    const handleTab = (buttonId) => {
        setTab(buttonId);
    };

    return (
        <Stack
            paddingY={{ base: "20px", md: "50px", lg: "100px" }}
            justify="flex-start"
            align="center"
            spacing="20px"
            width="100%"
            background="#F9F9F9"
        >
                {/* Header Section */}
                <TitleWrapper>
                    <TitleText>An innovating experience that’d fit your need</TitleText>
                    <TitleDescription>Designed to fit your needs</TitleDescription>
                </TitleWrapper>

                {/* Buttons Section */}
                <Stack
                    direction={{ base: "column", md: "row" }} // Stack vertically on small screens
                    spacing="20px"
                    width="100%"
                    maxWidth="734px" // Match maxWidth with the card section
                    justify="center"
                    align="center"
                >
                    {["Simple", "Customizable", "Exportable"].map((title, index) => (
                        <Button
                            key={index}
                            paddingX={{ base: "20px", md: "40px" }} // Responsive padding
                            paddingY="15px"
                            borderRadius="10px"
                            width={{ base: "100%", md: "224px" }}
                            height="60px"
                            background={tab === index + 1 ? "#BF9BE6" : "#7E3BB5"}
                            fontSize={{ base: "18px", md: "22px" }}
                            fontWeight="semibold"
                            color="#FFFFFF"
                            textAlign="center"
                            _hover={{
                                background: tab === index + 1 ? "#BF9BE6" : "#6C33A1",
                            }}
                            _active={{
                                transform: "scale(0.95)",
                                background: "#BF9BE6",
                            }}
                            transition="all 0.1s ease-in-out"
                            onClick={() => handleTab(index + 1)}
                        >
                            {title}
                        </Button>
                    ))}
                </Stack>

                {/* Card Section */}
                <Stack
                    paddingX={{ base: "20px", md: "40px" }}
                    paddingY="30px"
                    borderRadius="15px"
                    spacing="20px"
                    width="100%"
                    maxWidth="734px" // Match maxWidth with the buttons section
                    background="#FFFFFF"
                    boxShadow="0px 1px 4px rgba(0, 0, 0, 0.25)"
                >
                    <Stack
                        direction={{ base: "column", md: "row" }} // Stack vertically on small screens
                        spacing="20px"
                        align="center"
                        width="100%"
                    >
                        <Box
                            padding="20px"
                            borderRadius="50%"
                            background="#7E3BB5"
                            width="80px"
                            height="80px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {tab === 1 ? (
                                <FiThumbsUp color="white" size="40px" />
                            ) : tab === 2 ? (
                                <LuPen color="white" size="40px" />
                            ) : (
                                <RiShare2Line color="white" size="40px" />
                            )}
                        </Box>
                        <Text
                            fontWeight="bold"
                            fontSize={{ base: "18px", md: "24px" }}
                            color="#313131"
                            textAlign={{ base: "center", md: "left" }}
                        >
                            {tab === 1
                                ? "Intuitive design to maximize your output"
                                : tab === 2
                                    ? "Customize your experience"
                                    : "Export your data to other platforms"}
                        </Text>
                    </Stack>
                    <Text
                        fontSize={{ base: "14px", md: "18px" }}
                        color="#707070"
                        textAlign="justify"
                    >
                        {tab === 1
                            ? "Quick Check UI has been engineered to be as intuitive as possible for you to enjoy the simple but efficient experience."
                            : tab === 2
                                ? "Quick Check lets you customize your experience to better match your specific needs."
                                : "Quick Check data can be exported to other platforms to help you better fit your needs."}
                    </Text>
                </Stack>
        </Stack>

    );
}

