import {
    Box,
    Button,
    Stack,
    Text,
    Image,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, background
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import React from "react";
import SideBar from "../shared/SideBar.jsx";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleNavigate = (to) => {
        return () => navigate(to); // Return a function that navigates to the specified path
    };
    return (
            <Stack
                paddingX="26px"
                paddingY="11px"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                width="100%"
                height="100px"
                background="#F9F9F9"
            >
                <Stack
                    direction="row"
                    justify="space-between"
                    align="center"
                    spacing="20px"
                    width="100%"
                >
                    {/* Left Section with Menu Icon and Quick Check Text */}
                    <Stack direction="row" justify="flex-start" align="center" spacing="12px">
                        <Button
                            paddingX="14px"
                            paddingY="19px"
                            borderRadius="10px"
                            justify="center"
                            align="center"
                            width="55px"
                            height="55px"
                            background="#FFFFFF"
                            ref={btnRef}
                            onClick={onOpen}
                        >
                            <IoMenu size={"200%"} />
                        </Button>

                        <SideBar
                            isOpen={isOpen}
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        />

                        <Stack direction="row" align="center" spacing="10px">
                            <Button
                                width="78px"
                                height="auto"
                                padding={"0px"}
                                background={"transparent"}
                                _hover={{ background: "transparent" }}
                                onClick={handleNavigate("/")}
                            >
                                <Image src={"././QuickCheckTransparent.png"} />
                            </Button>
                            <Button
                                fontFamily="Inter"
                                fontWeight="bold"
                                fontSize="26px"
                                color="#313131"
                                textAlign="left"  // Align text to the left
                                padding={"0px"}
                                background={"transparent"}
                                _hover={{ background: "transparent" }}
                                onClick={handleNavigate("/")}
                            >
                                Quick Check
                            </Button>
                        </Stack>
                    </Stack>

                    {/* Right Section with Login Icon */}
                    <Button
                        paddingX="11px"
                        paddingY="14px"
                        borderRadius="10px"
                        justify="center"
                        align="center"
                        width="55px"
                        height="55px"
                        background="#7E3BB5"
                        onClick={handleNavigate("/login")}
                    >
                        <RiLoginBoxLine color={"white"} size={"200%"} />
                    </Button>
                </Stack>
            </Stack>
    );
}
