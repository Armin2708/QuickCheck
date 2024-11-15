import {Box, Divider, Spinner, Text, VStack} from "@chakra-ui/react";
import ClassCard from "../../class/ClassCard.jsx";
import BrowseClassButton from "../../class/BrowseClassButton.jsx";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {useParams} from "react-router-dom";
import {getClassesOfInstructorInOrganization, getClassesOfUserInOrganization} from "../../../services/client.js";

export default function ClassListComponent({fullUser}){

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const { name: organizationName } = useParams();

    const deduplicateClasses = (classes) => {
        const uniqueClassesMap = new Map();
        classes.forEach((classObject) => {
            uniqueClassesMap.set(classObject.id, classObject);
        });
        return Array.from(uniqueClassesMap.values());
    };

    const fetchClasses = () => {
        setLoading(true); // Start loading

        Promise.all([
            getClassesOfUserInOrganization(fullUser?.id, organizationName),
            getClassesOfInstructorInOrganization(fullUser?.id, organizationName),
        ])
            .then(([userClassesResponse, instructorClassesResponse]) => {
                // Combine both responses
                const combinedClasses = [
                    ...(userClassesResponse.data || []),
                    ...(instructorClassesResponse.data || []),
                ];

                // Deduplicate classes based on `id`
                const uniqueClasses = deduplicateClasses(combinedClasses);

                // Update the state with the unique classes
                setClasses(uniqueClasses);
            })
            .catch((error) => {
                console.error("Error fetching classrooms:", error);
            })
            .finally(() => {
                setLoading(false); // End loading
            });
    };


    useEffect(() => {
        if (fullUser?.id) {
            fetchClasses();
        }
    }, [organizationName,fullUser]);


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
                ) : null}
                <BrowseClassButton />
            </VStack>
        </Box>
    )
}