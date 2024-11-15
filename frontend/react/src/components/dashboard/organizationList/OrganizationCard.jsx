import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Button, HStack,
} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {getClassrooms, getUserById, leaveClass, leaveOrganization} from "../../../services/client.js";
import {useNavigate} from "react-router-dom";
import {errorNotification, successNotification} from "../../../services/notification.js";
import {LuTrash2} from "react-icons/lu";

export default function OrganizationCard({name}) {

    const navigate = useNavigate();


    return (
        <Box
            width={"100%"}
            backgroundColor={"#9363BA"}
            color={"white"}
            border={"2px"}
            borderColor={"#7E3BB5"}
            borderRadius={"full"}
            cursor="pointer"
            _hover={{
                transform: "scale(1.05)", // Scale up slightly on hover
                transition: "transform 0.2s ease-in-out" // Smooth transition effect
            }}
            onClick={() => navigate(`/organization/${name}`)}
        >
            <HStack paddingLeft={"13px"} spacing={"20px"} justifyContent="space-between">
                <Text fontSize={'lg'} fontFamily={'body'} fontWeight={500} >
                    {name}
                </Text>
            </HStack>
        </Box>
    );
}