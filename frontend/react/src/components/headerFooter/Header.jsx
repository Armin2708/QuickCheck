import {
    Box,
    Button,
    Stack,
    Text,
    Image,
    useDisclosure,
    HStack,
    IconButton,
    Flex,
    Menu,
    MenuButton, Avatar, VStack, MenuList, useColorModeValue, MenuItem, MenuDivider
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import React from "react";

import {useNavigate} from "react-router-dom";
import {FiBell, FiChevronDown} from "react-icons/fi";
import {useAuth} from "../context/AuthContext.jsx";
import SideBar from "../shared/SideBar.jsx";

export default function Header() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = React.useRef()

    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleNavigate = (to) => {
        return () => navigate(to); // Return a function that navigates to the specified path
    };

    const {logOut, user} = useAuth();

    const handleLogOut = () => {
        logOut();
        navigate("/login");  // Ensure the user is navigated to the login page
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
                        <IoMenu size={"200%"}/>
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
                            _hover={{background: "transparent"}}
                            onClick={handleNavigate("/")}
                        >
                            <Image src={"././QuickCheckTransparent.png"}/>
                        </Button>
                        <Button
                            fontFamily="Inter"
                            fontWeight="bold"
                            fontSize="26px"
                            color="#313131"
                            textAlign="left"  // Align text to the left
                            padding={"0px"}
                            background={"transparent"}
                            _hover={{background: "transparent"}}
                            onClick={handleNavigate("/")}
                        >
                            Quick Check
                        </Button>
                    </Stack>
                </Stack>

                {/* Right Section with Login Icon */}
                <HStack spacing={{base: '0', md: '6'}}>
                    <IconButton
                        size="lg"
                        variant="ghost"
                        aria-label="open menu"
                        icon={<FiBell/>}
                    />
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                py={2}
                                transition="all 0.3s"
                                _focus={{boxShadow: 'none'}}>
                                <HStack>
                                    <Avatar
                                        size={'sm'}
                                        src={
                                            'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                        }
                                    />
                                    <VStack
                                        display={{base: 'none', md: 'flex'}}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2">
                                        <Text fontSize="sm">{user?.username}</Text>
                                        {user?.roles.map((role, id) => (
                                            <Text key={id} fontSize="xs" color="gray.600">
                                                {role}
                                            </Text>
                                        ))}
                                    </VStack>
                                    <Box display={{base: 'none', md: 'flex'}}>
                                        <FiChevronDown/>
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                <MenuItem>Profile</MenuItem>
                                <MenuItem>Settings</MenuItem>
                                <MenuItem>Billing</MenuItem>
                                <MenuDivider/>
                                <MenuItem onClick={handleLogOut}>
                                    Sign out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            </Stack>
        </Stack>
    )
}