import HeaderFooter from "../components/shared/HeaderFooter.jsx";
import CreateOrganizationButton from "../components/organization/CreateOrganizationButton.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "../components/context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {getOrganizationsOfUser} from "../services/client.js";
import SideBar from "../components/shared/SideBar.jsx";
import {Box, Flex, Spinner, Stack, Text, Wrap, WrapItem, Center} from "@chakra-ui/react";
import OrganizationCard from "../components/organization/OrganizationCard.jsx";
import BrowseOrganizationButton from "../components/organization/BrowseOrganizationButton.jsx";

export default function Dashboard() {
    const [organizations, setOrganizations] = useState([]);
    const { fullUser, isUserAdmin } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const fetchOrganization = () => {
        setLoading(true); // Start loading
        getOrganizationsOfUser(fullUser.id)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setOrganizations(res.data);
                } else {
                    console.error('Expected an array but got:', res.data);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            })
            .finally(() => {
                setLoading(false); // Stop loading after fetch
            });
    };

    useEffect(() => {
        if (fullUser && fullUser.id) {
            fetchOrganization();
        }
    }, [fullUser]);

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
                        <Stack direction={"row"}>
                            <BrowseOrganizationButton />
                        </Stack>
                        <Text fontWeight={"semibold"} fontSize={"30px"}>My Organizations</Text>
                        <Wrap justify={"center"} spacing={"30px"}>
                            {Array.isArray(organizations) && organizations.length > 0 ? (
                                organizations.map((organization) => (
                                    <WrapItem key={organization?.id}>
                                        <OrganizationCard {...organization} onSuccess={fetchOrganization} fullUser={fullUser}/>
                                    </WrapItem>
                                ))
                            ) : (
                                <WrapItem>
                                    <Text>
                                        You are not in any Organization. Join by browsing!
                                    </Text>
                                </WrapItem>
                            )}
                        </Wrap>
                    </Box>
                </Wrap>
            </Flex>
        </HeaderFooter>
    );
}
