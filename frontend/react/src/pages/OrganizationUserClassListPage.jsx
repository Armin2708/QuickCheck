import { Box, Button, Stack, Wrap, WrapItem, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {getClassesOfInstructorInOrganization, getClassesOfUserInOrganization} from "../services/client.js";
import SideBar from "../components/shared/SideBar.jsx";
import ClassCard from "../components/class/ClassCard.jsx";
import HeaderFooter from "../components/shared/HeaderFooter.jsx";
import { useAuth } from "../components/context/AuthContext.jsx";
import BrowseClassroomButton from "../components/class/BrowseClassButton.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function OrganizationUserClassListPage() {
    const [classes, setClasses] = useState([]);
    const { fullUser } = useAuth();
    const navigate = useNavigate();
    const { name: organizationName } = useParams();
    const [loading, setLoading] = useState(true); // Add loading state

    const fetchClasses = () => {
        setLoading(true); // Start loading

        getClassesOfInstructorInOrganization(fullUser.id,organizationName)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setClasses(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching classrooms:", error);
            })

        getClassesOfUserInOrganization(fullUser.id, organizationName)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setClasses((prevClasses) => [...prevClasses, ...res.data]);
                } else {
                    console.error("Expected an array but got:", res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching classrooms:", error);
            })
            .finally(() => setLoading(false)); // End loading
    };

    useEffect(() => {
        if (fullUser && fullUser.id) {
            fetchClasses();
        }
    }, [fullUser]);

    // Show spinner while loading
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
                                navigate("/dashboard");
                            }}
                            backgroundColor={"#7E3BB5"}
                            color={"white"}
                            _active={{
                                transform: "scale(1)" // Return to original size when clicked
                            }}
                            leftIcon={<FaArrowLeft />}
                        >
                            Dashboard
                        </Button>
                        <BrowseClassroomButton />
                    </Stack>
                    <Wrap justify={"center"} spacing={"30px"}>
                        {Array.isArray(classes) && classes.length > 0 ? (
                            classes.map((classObject) => (
                                <WrapItem key={classObject.id}>
                                    <ClassCard {...classObject} onSuccess={fetchClasses} fullUser={fullUser} />
                                </WrapItem>
                            ))
                        ) : (
                            <WrapItem>No Classes found in {organizationName}.</WrapItem>
                        )}
                    </Wrap>
                </Box>
            </Wrap>
        </HeaderFooter>
    );
}
