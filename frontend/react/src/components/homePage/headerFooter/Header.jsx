import {
    Button,
    Stack,
    Text,
    Image,
    HStack,
    Flex,
    Menu,
    MenuButton, Avatar, VStack, MenuList, MenuItem, MenuDivider
} from "@chakra-ui/react";

import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import {getUserProfilePictureUrl} from "../../../services/client.js";

export default function Header() {
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const {logOut, user, isUserAuthenticated, fullUser} = useAuth();


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


                    <Stack direction="row" align="center" spacing="10px">
                        <Button
                            width="78px"
                            height="auto"
                            padding={"0px"}
                            background={"transparent"}
                            _hover={{background: "transparent"}}
                            onClick={() =>navigate("/")}
                        >
                            <Image src={"/QuickCheckTransparent.png"}/>
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
                            onClick={() =>navigate("/")}
                        >
                            Quick Check
                        </Button>
                    </Stack>
                </Stack>

                {/* Right Section with Login Icon */}
                <HStack spacing={{ base: '0', md: '6' }}>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                py={2}
                                transition="all 0.3s"
                                _focus={{ boxShadow: 'none' }}
                                _hover={{
                                    transform: 'scale(1.1)', // Increased scale
                                    transition: 'transform 0.2s ease-in-out' // Longer transition duration
                                }}
                            >
                                <HStack>
                                        <Avatar
                                            size={'md'}
                                            src={getUserProfilePictureUrl(fullUser.id)|| null}
                                        />
                                    <VStack
                                        display={{ base: 'none', md: 'flex' }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2"
                                    >
                                        <Text fontSize="sm" color={"#313131"} fontFamily="Inter" fontWeight="semibold">{user?.username}</Text>
                                        {user?.roles.map((role, id) => (
                                            <Text key={id} fontSize="xs" color={"#313131"}>
                                                {role+" "}
                                            </Text>
                                        ))}
                                    </VStack>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                color={"#313131"}
                                borderRadius={"6px"}
                                borderColor={"transparent"}
                                boxShadow={'2xl'}
                            >
                                <MenuItem
                                    fontFamily="Inter"
                                    fontWeight="semibold"
                                    onClick={()=>{navigate(`/profile`)}}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem fontFamily="Inter" fontWeight="semibold">Settings</MenuItem>
                                <MenuItem fontFamily="Inter" fontWeight="semibold">Billing</MenuItem>
                                <MenuDivider />
                                {
                                    !isUserAuthenticated() ? (
                                        <MenuItem onClick={()=>{navigate("/login")}} fontFamily="Inter" fontWeight="semibold">
                                            Login
                                        </MenuItem>
                                    ): (
                                        <MenuItem onClick={()=>{
                                            handleLogOut()
                                            navigate("/login")
                                        }} fontFamily="Inter" fontWeight="semibold">
                                            Sign Out
                                        </MenuItem>
                                    )
                                }
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            </Stack>
        </Stack>
    )
}