import {
    Avatar,
    Button,
    HStack,
    Image,
    Menu,
    MenuButton, MenuDivider, MenuItem,
    MenuList,
    Stack,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import {IoMenu} from "react-icons/io5";
import SideBar from "../shared/SideBar.jsx";
import {FaArrowLeft} from "react-icons/fa";
import {useProfileImage} from "../../services/useProfileImage.js";

export default  function Navbar({colorTheme,orgName}){

    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = React.useRef()

    const navigate = useNavigate(); // Get the navigate function from react-router-dom
    const {logOut, user, isUserAuthenticated, fullUser} = useAuth();

    const { profileImageUrl, fetchProfileImage } = useProfileImage(fullUser?.id);

    const handleLogOut = () => {
        logOut();
        navigate("/login");  // Ensure the user is navigated to the login page
    }

    return (

        <Stack
            direction={"row"}
            marginX={"40px"}
            marginY={"30px"}
            paddingX="20px"
            paddingY="5px"
            borderRadius="10px"
            justify="center"  // Center vertically
            align="center"  // Align content horizontally
            spacing="10px"
            height="80px"
            alignSelf="stretch"
            background={colorTheme == "darkMode" ? "#313131" : "#FFFFFF"}
            boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25)"
        >
            <Stack
                direction="row"
                justify="flex-start" // Align content to the left
                align="center"
                spacing="60px"
                width="100%" // Take full width to push items to the left
            >
                {/* Icon Button */}
                <Button
                    borderRadius="8px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="50px"   // Set explicit width
                    height="50px"  // Set explicit height to match width for square shape
                    background={colorTheme == "darkMode" ? "#252525" : "#F9F9F9"}
                    padding="0"  // Remove padding to ensure square button
                    minWidth="28px"  // Ensure it doesn't shrink below 28px
                    minHeight="28px"  // Ensure it doesn't shrink below 28px
                    onClick={onOpen}
                >
                    <IoMenu size="40px"
                            color={colorTheme == "darkMode" ? "#707070" : "#313131"}/> {/* Set icon size to fit */}
                </Button>
                <SideBar
                    isOpen={isOpen}
                    onClose={onClose}
                    finalFocusRef={btnRef}
                />
                <Button
                    background={colorTheme == "darkMode" ? "#252525" : "#F9F9F9"}
                    leftIcon={<FaArrowLeft color={colorTheme == "darkMode" ? "#707070" : "#313131"}/>}
                    onClick={() => navigate(`/organization/${orgName}`)}
                >
                    <Text fontFamily="Inter"
                          fontWeight="bold"
                          fontSize="20px"
                          color={colorTheme == "darkMode" ? "#707070" : "#313131"}
                          lineHeight="34.5px">
                        Back
                    </Text>
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
                    onClick={()=>{
                        navigate("/")
                    }}
                >
                    <Image
                        width="60px"
                        height="60px"
                        src={colorTheme == 'darkMode' ? "/QuickCheckTransparentGray.png" : "/QuickCheckTransparent.png"}
                    />
                    <Text
                        fontFamily="Inter"
                        fontWeight="bold"
                        fontSize="26px"
                        color={colorTheme == "darkMode" ? "#707070" : "#313131"}
                        marginLeft="8px"  // Space between image and text
                        lineHeight="34.5px"  // Line height matches the image height
                    >
                        Quick Check
                    </Text>
                </Button>
            </Stack>
            <Stack>
                <Menu>
                    <MenuButton
                        py={2}
                        transition="all 0.3s"
                        _focus={{boxShadow: 'none'}}
                        _hover={{
                            transform: 'scale(1.1)', // Increased scale
                            transition: 'transform 0.2s ease-in-out' // Longer transition duration
                        }}
                    >
                        <HStack>

                            <VStack
                                display={{base: 'none', md: 'flex'}}
                                alignItems="flex-start"
                                spacing="1px"
                                ml="2"
                            >
                                <Text fontSize="sm" color={colorTheme == "darkMode" ? "#707070" : "#313131"} fontFamily="Inter"
                                      fontWeight="semibold">{user?.username}</Text>
                                {user?.roles.map((role, id) => (
                                    <Text key={id} fontSize="xs" color={colorTheme == "darkMode" ? "#707070" : "#313131"}>
                                        {role}
                                    </Text>
                                ))}
                            </VStack>
                            <Avatar
                                size={'md'}
                                src={profileImageUrl}
                            />
                        </HStack>
                    </MenuButton>
                    <MenuList
                        color={colorTheme == "darkMode" ? "#707070" : "#313131"}
                        borderRadius={"6px"}
                        borderColor={"transparent"}
                        boxShadow={'2xl'}
                    >
                        <MenuItem
                            fontFamily="Inter"
                            fontWeight="semibold"
                            onClick={() => {
                                navigate("/profile")
                            }}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem fontFamily="Inter" fontWeight="semibold">Settings</MenuItem>
                        <MenuItem fontFamily="Inter" fontWeight="semibold">Billing</MenuItem>
                        <MenuDivider/>
                        {
                            !isUserAuthenticated() ? (
                                <MenuItem onClick={() => {
                                    navigate("/login")
                                }} fontFamily="Inter" fontWeight="semibold">
                                    Login
                                </MenuItem>
                            ) : (
                                <MenuItem onClick={() => {
                                    handleLogOut()
                                    navigate("/login")
                                }} fontFamily="Inter" fontWeight="semibold">
                                    Sign Out
                                </MenuItem>
                            )
                        }
                    </MenuList>
                </Menu>
            </Stack>
        </Stack>
    );
}