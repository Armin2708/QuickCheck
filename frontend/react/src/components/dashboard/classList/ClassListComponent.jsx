import {Box, Divider, Spinner, Text, VStack} from "@chakra-ui/react";
import ClassCard from "./class/ClassCard.jsx";
import BrowseClassButton from "./class/BrowseClassButton.jsx";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {useParams} from "react-router-dom";
import {
    getClassesOfInstructorInOrganization,
    getClassesOfUserInOrganization,
    getClassroomById
} from "../../../services/client.js";

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
        if (fullUser?.id && organizationName) {
            fetchClasses();
        }
    }, [organizationName,fullUser]);


    return(
        <Box
            padding="10px"
            paddingLeft="40px"
            display="flex" /* Enables flexbox layout */
            flexDirection="column" /* Arranges children vertically */
            alignItems="flex-start" /* Aligns items to the left */
            gap="10px" /* Adds spacing between items */
        >
            {/* Render organizations */}
            {Array.isArray(classes) && classes.length > 0 ? (
                classes.map((classObject) => (
                    <ClassCard {...classObject} key={classObject.id}/>
                ))) : null}
            <BrowseClassButton />
        </Box>
    )
}