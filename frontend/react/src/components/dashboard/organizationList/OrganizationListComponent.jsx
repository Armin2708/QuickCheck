import {
    Box, Button,
    Center,
    Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay,
    Flex, Image,
    Spinner,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getOrganizationsOfUser } from "../../../services/client.js";
import BrowseOrganizationButton from "./BrowseOrganizationButton.jsx";
import OrganizationCard from "./OrganizationCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import {HiOutlineHome} from "react-icons/hi";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {LuSettings} from "react-icons/lu";
import {RiLoginBoxLine} from "react-icons/ri";

export default function OrganizationListComponent({fullUser}) {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrganization = () => {
        setLoading(true);
        getOrganizationsOfUser(fullUser.id)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setOrganizations(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (fullUser && fullUser.id) {
            fetchOrganization();
        }
    }, [fullUser]);



    return (
        <Box
            width={{ base: "100%", md: "150px" }} // Full width on mobile, fixed width on larger screens
            minHeight="100vh" // Full height of the viewport
            background="#D9D9D9" // Sidebar background
            boxShadow="2px 0 5px rgba(0, 0, 0, 0.1)" // Optional shadow
            padding="20px"
            overflowY="auto" // Scroll if content exceeds available height
        >
            <Text fontWeight="semibold" fontSize="20px" textAlign={"center"}>
                Groups
            </Text>
            <Divider marginY="10px" />
            <VStack
                spacing="10px"
                align="stretch" // Ensures full width for child components
                width="100%"
            >
                {/* Render organizations */}
                {Array.isArray(organizations) && organizations.length > 0 ? (
                    organizations.map((organization) => (
                        <OrganizationCard
                            key={organization?.id}
                            {...organization}
                            onSuccess={fetchOrganization}
                            fullUser={fullUser}
                        />
                    ))
                ) : null}
                <BrowseOrganizationButton/>
            </VStack>
        </Box>
    );
}
