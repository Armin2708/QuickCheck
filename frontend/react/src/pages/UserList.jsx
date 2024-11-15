import HeaderFooter from "../components/shared/HeaderFooter.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getOrganizationsOfUser, getUsers} from "../services/client.js";
import SideBar from "../components/shared/SideBar.jsx";
import {Box, Flex, Spinner, Stack, Text, Wrap, WrapItem, Center} from "@chakra-ui/react";
import BrowseOrganizationButton from "../components/dashboard/organizationList/BrowseOrganizationButton.jsx";
import UserProfileCard from "../components/userProfile/UserProfileCard.jsx";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        setLoading(true); // Start loading
        getUsers()
            .then(res => {
                if (Array.isArray(res.data)) {
                    setUsers(res.data);
                } else {
                    console.error('Expected an array but got:', res.data);
                }
            })
            .catch(error => {
                console.error('Error users:', error);
            })
            .finally(() => {
                setLoading(false); // Stop loading after fetch
            });
    };

    useEffect(() => {
        fetchUsers();

    }, []);

    if (loading) {
        // Show a spinner while loading
        return (
            <Center minH="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    return (
        <HeaderFooter>
            <Flex direction={"column"}>
                <SideBar />
                <Wrap justify={"center"}>
                    <Box p="4">
                        <Text fontWeight={"semibold"} fontSize={"30px"}>Users</Text>
                        <Wrap justify={"center"} spacing={"30px"}>
                            {Array.isArray(users) && users.length > 0 ? (
                                users.map((user) => (
                                    <WrapItem key={user?.id}>
                                        <UserProfileCard {...user} onSuccess={fetchUsers} returnButton={false} userProfile={false} />
                                    </WrapItem>
                                ))
                            ) : (
                                <Text> No Users </Text>
                            )}
                        </Wrap>
                    </Box>
                </Wrap>
            </Flex>
        </HeaderFooter>
    );
}
