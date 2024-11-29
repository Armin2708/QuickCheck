import {Box, Divider, Text} from "@chakra-ui/react";
import ClassCard from "./class/ClassCard.jsx";
import BrowseClassButton from "./class/BrowseClassButton.jsx";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    getClassesOfInstructorInOrganization,
    getClassesOfUserInOrganization
} from "../../../services/client/classes.js";


export default function ClassListComponent({fullUser}){

    const [userClasses, setUserClasses] = useState([]);
    const [instructorClasses, setInstructorClasses] = useState([]);

    const [loading, setLoading] = useState(true); // Add loading state
    const { name: organizationName } = useParams();

    const fetchUserClasses = () => {
        setLoading(true);
        getClassesOfUserInOrganization(fullUser?.id, organizationName)
            .then((res) => {
                setUserClasses(res.data);
            })
            .catch((error) => {
                console.error("Error fetching classrooms:", error);
            })
            .finally(() => {
                setLoading(false); // End loading
            });
    };

    const fetchInstructorClasses = () =>{
        setLoading(true);
        getClassesOfInstructorInOrganization(fullUser?.id, organizationName)
            .then((res) => {
                setInstructorClasses(res.data);
            })
            .catch((error) => {
                console.error("Error fetching classrooms:", error);
            })
            .finally(() => {
                setLoading(false); // End loading
            });
    }


    useEffect(() => {
        if (fullUser?.id && organizationName) {
            fetchUserClasses();
            fetchInstructorClasses();
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
            <Text >Instructor</Text>
            <Divider/>
            {Array.isArray(instructorClasses) && instructorClasses.length > 0 ? (
                instructorClasses.map((instructorClassObject,index) => (
                    <ClassCard {...instructorClassObject} key={index}/>
                ))) : null}
            <Text marginTop={"10px"}>User</Text>
            <Divider/>
            {Array.isArray(userClasses) && userClasses.length > 0 ? (
                userClasses.map((userClassObject,index) => (
                    <ClassCard {...userClassObject} key={-index}/>
                ))) : null}
            <BrowseClassButton />
        </Box>
    )
}