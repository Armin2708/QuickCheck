import { Box, Button, Stack, Wrap, WrapItem, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    getOrganizations,
    getOrganizationsOfUser
} from "../services/client.js";
import SideBar from "../components/shared/SideBar.jsx";
import HeaderFooter from "../components/shared/HeaderFooter.jsx";
import { FaArrowLeft } from "react-icons/fa";
import BrowseOrganizationCard from "../components/organization/BrowseOrganizationCard.jsx";
import { useAuth } from "../components/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import CreateOrganizationButton from "../components/organization/CreateOrganizationButton.jsx";

export default function BrowseOrganizationListPage() {
    const [organizations, setOrganizations] = useState([]);
    const [joinedOrg, setJoinedOrg] = useState([]);
    const { fullUser,isUserAdmin } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const fetchOrganizations = () => {
        return getOrganizations()
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setOrganizations(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching organizations:", error);
            });
    };

    const fetchUserOrganizations = () => {
        if (!fullUser.id) return;
        return getOrganizationsOfUser(fullUser.id)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setJoinedOrg(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching user organizations:", error);
            });
    };

    useEffect(() => {
        // Start loading before fetching data
        setLoading(true);

        Promise.all([fetchOrganizations(), fetchUserOrganizations()])
            .then(() => setLoading(false)) // Stop loading after both requests complete
            .catch(() => setLoading(false));
    }, [fullUser.id]);

    if (loading) {
        return (
            <Center minH="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    return (
        <HeaderFooter>
            <SideBar />
            <Wrap justify={"center"}>
                <Box p="4">
                    <Stack direction={"row"}>
                        <Button
                            onClick={() => {
                                navigate(`/dashboard`);
                            }}
                            leftIcon={<FaArrowLeft />}
                        >
                            Return
                        </Button>
                        {isUserAdmin() &&<CreateOrganizationButton onSuccess={fetchOrganizations} />}
                    </Stack>
                    <Wrap justify={"center"} spacing={"30px"}>
                        {Array.isArray(organizations) && organizations.length > 0 ? (
                            organizations.map((organization) => (
                                <WrapItem key={organization.id}>
                                    <BrowseOrganizationCard
                                        {...organization}
                                        joinedOrg={joinedOrg}
                                    />
                                </WrapItem>
                            ))
                        ) : (
                            <WrapItem>No Organizations.</WrapItem>
                        )}
                    </Wrap>
                </Box>
            </Wrap>
        </HeaderFooter>
    );
}
