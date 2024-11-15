import {Box, Divider, Text, VStack} from "@chakra-ui/react";
import ClassCard from "../class/ClassCard.jsx";
import BrowseClassButton from "../class/BrowseClassButton.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useParams} from "react-router-dom";
import {getClassesOfInstructorInOrganization, getClassesOfUserInOrganization} from "../../services/client.js";

export default function ClassListComponent({}){

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const { fullUser } = useAuth();
    const { name: organizationName } = useParams();

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
        if (fullUser?.id) {
            fetchClasses();
        }
    }, [fullUser]);


    return(
        <Box
            width={{ base: "100%", md: "150px" }} // Full width on mobile, fixed width on larger screens
            minHeight="100vh" // Full height of the viewport
            background="#F9F9F9" // Sidebar background
            boxShadow="2px 0 5px rgba(0, 0, 0, 0.1)" // Optional shadow
            padding="20px"
            overflowY="auto" // Scroll if content exceeds available height
        >
            <Text fontWeight="semibold" fontSize="20px" textAlign={"center"}>
                Classes
            </Text>
            <Divider marginY="10px" />
            <VStack
                spacing="20px"
                width="100%"
                height={"100%"}
            >
                {/* Render organizations */}
                {Array.isArray(classes) && classes.length > 0 ? (
                    classes.map((classObject) => (
                        <ClassCard {...classObject} key={classObject.id} />
                    ))
                ) : (
                    null
                )}
                <BrowseClassButton />
            </VStack>
        </Box>
    )
}