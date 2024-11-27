import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import {
    Avatar,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import React from "react";
import {getUserProfilePictureUrl} from "../../services/client/users.js";

export default function ProfileComponent({}){

    const navigate=useNavigate();

    const {logOut, user, isUserAuthenticated, fullUser} = useAuth();

    const color=useColorModeValue("#F4F3F3","#313131")

    const handleLogOut = () => {
        logOut();
        navigate("/login");  // Ensure the user is navigated to the login page
    };
    return(
        <HStack spacing={{ base: '0', md: '6' }} zIndex={4}>
            <Menu>
                <MenuButton
                    py={2}
                    transition="all 0.3s"

                >
                    <HStack>
                        <Avatar
                            size={'md'}
                            src={getUserProfilePictureUrl(fullUser?.id) || null}
                        />
                        <VStack
                            display={{ base: 'none', md: 'flex' }}
                            alignItems="flex-start"
                            spacing="1px"
                            ml="2"
                        >
                            <Text fontSize="sm"  fontFamily="Inter" fontWeight="semibold">{user?.username}</Text>
                            {user?.roles.map((role, id) => (
                                <Text key={id} fontSize="xs" >
                                    {role+" "}
                                </Text>
                            ))}
                        </VStack>
                    </HStack>
                </MenuButton>
                <MenuList

                    borderRadius={"6px"}
                    borderColor={"transparent"}
                    boxShadow={'2xl'}
                    bg={color}
                >
                    <MenuItem
                        bg={color}
                        fontFamily="Inter"
                        fontWeight="semibold"
                        onClick={()=>{navigate(`/profile`)}}
                    >
                        Profile
                    </MenuItem>
                    <MenuDivider bg={useColorModeValue("#313131","#F4F3F3")}/>
                    {
                        !isUserAuthenticated() ? (
                            <MenuItem bg={color} onClick={()=>{navigate("/login")}} fontFamily="Inter" fontWeight="semibold">
                                Login
                            </MenuItem>
                        ): (
                            <MenuItem bg={color} onClick={()=>{
                                handleLogOut()
                                navigate("/login")
                            }} fontFamily="Inter" fontWeight="semibold">
                                Sign Out
                            </MenuItem>
                        )
                    }
                </MenuList>
            </Menu>
        </HStack>
    )
}