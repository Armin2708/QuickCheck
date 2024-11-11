import {
    Stack,
    Box,
    Text,
    Button,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader, DrawerBody, DrawerFooter, Drawer, Image, Divider
} from '@chakra-ui/react';
import { HiOutlineHome } from 'react-icons/hi';
import React from 'react';
import { FiUsers } from "react-icons/fi";
import { RiLoginBoxLine } from "react-icons/ri";
import {LuSettings } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import {MdOutlineSpaceDashboard} from "react-icons/md";

export default function SideBar({ isOpen, onClose, finalFocusRef }) {
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleNavigate = (to) => {
        return () => navigate(to); // Return a function that navigates to the specified path
    };

    const {logOut,isAdmin} = useAuth();

    return (
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={finalFocusRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Box width="78px" height="auto">
                        <Image src={"/QuickCheckTransparent.png"} />
                    </Box>
                </DrawerHeader>
                <Divider />
                <DrawerBody>
                    <ButtonWrapper>

                        <SideBarPageButton handleNavigate={handleNavigate("/")}>
                            <HiOutlineHome size="24px" />
                            <ButtonText>
                                Home
                            </ButtonText>
                        </SideBarPageButton>

                        <SideBarPageButton handleNavigate={handleNavigate("/dashboard")}>
                            <MdOutlineSpaceDashboard size={"24px"} />

                            <ButtonText>
                                Dash Board
                            </ButtonText>
                        </SideBarPageButton>

                        {isAdmin() &&
                            <SideBarPageButton handleNavigate={handleNavigate("/users")}>
                            <FiUsers size="24px"/>
                            <ButtonText>
                                Users
                            </ButtonText>
                        </SideBarPageButton>
                        }

                    </ButtonWrapper>
                </DrawerBody>

                <DrawerFooter>
                    <ButtonWrapper>
                        <Divider/>
                        <SideBarPageButton handleNavigate={handleNavigate("/settings")}>
                            <LuSettings size="24px" />
                            <ButtonText>
                                Settings
                            </ButtonText>
                        </SideBarPageButton>

                        <Button
                            width="100%"
                            justifyContent="flex-start"
                            alignItems="center"
                            background="transparent"
                            _hover={{ background: "#EBECFF" }}
                            _active={{
                                transform: "scale(0.95)",  // Scale down a bit on click
                                background: "#EBECFF",  // Change background when active
                            }}
                            onClick={logOut}
                        >
                            <RiLoginBoxLine size="24px" />
                            <ButtonText>
                                Logout
                            </ButtonText>
                        </Button>

                    </ButtonWrapper>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function SideBarPageButton({ children, handleNavigate }) {
    return (
        <Button
            width="100%"
            justifyContent="flex-start"
            alignItems="center"
            background="transparent"
            _hover={{ background: "#EBECFF" }}
            _active={{
                transform: "scale(0.95)",  // Scale down a bit on click
                background: "#EBECFF",  // Change background when active
            }}
            onClick={handleNavigate}
            // Use handleNavigate passed as prop
        >
            {children}
        </Button>
    );
}

function ButtonText({ children }) {
    return (
        <Text fontFamily="Inter" fontWeight="semibold" fontSize="28px" color="#313131" marginLeft="12px">
            {children}
        </Text>
    );
}

function ButtonWrapper({ children }) {
    return (
        <Stack
            justify="center"
            align="flex-start"
            spacing="20px"
            width="100%"
        >
            {children}
        </Stack>
    );
}
