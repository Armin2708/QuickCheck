import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
    Box,
    Text, useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getOrganizationsOfUser } from "../../../services/client.js";
import BrowseOrganizationButton from "./organization/BrowseOrganizationButton.jsx";
import OrganizationCard from "./organization/OrganizationCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import ClassListComponent from "../classList/ClassListComponent.jsx";
import {useNavigate} from "react-router-dom";

export default function OrganizationListComponent(){

    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {fullUser} = useAuth();


    const fetchOrganization = () => {
        setLoading(true);
        getOrganizationsOfUser(fullUser.id)
            .then((res) => {
                    setOrganizations(res.data);
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


    return(
        <Box
            flex={1}
            minH={0}
            display="flex"
            flexDirection="column" /* Ensures vertical stacking of content */
            borderRadius="8px"
            p="4"
        >
            {/* Scrollable Content */}
                <Accordion allowToggle>
                    <Box
                        minH={0} /* Prevents overflow issues */
                        overflow="auto" /* Enables scrolling for overflowing content */
                    >
                        {Array.isArray(organizations) && organizations.length > 0 ? (
                            organizations.map((organization) => (
                                <AccordionItem key={organization.id} borderColor="transparent" padding={"5px"}>
                                    <Box
                                         color={"#9363BA"}
                                         borderLeft={"2px"}
                                         borderColor={"#7E3BB5"}
                                         bg={()=>useColorModeValue("white","#1D1D1D")}
                                         borderRadius={"8px"}
                                         maxW={"200px"}
                                         paddingX={"10px"}
                                    >
                                        <AccordionButton onClick={() => navigate(`/dashboard/${organization.name}`)} padding={"0px"}>
                                            <OrganizationCard {...organization} />
                                        <AccordionIcon />
                                    </AccordionButton>
                                    </Box>
                                    <AccordionPanel padding="0px" maxH="200px" overflowY="auto">
                                        <ClassListComponent fullUser={fullUser} />
                                    </AccordionPanel>
                                </AccordionItem>
                            ))
                        ) : (
                            <Text>No organizations found.</Text>
                        )}
                    </Box>

                    <AccordionItem borderColor="transparent" padding={"5px"}>
                        <Box paddingX={"20px"}>
                            <AccordionButton
                                padding={"0px"}
                                onClick={() => navigate(`/dashboard/organizations`)}
                                width="fit-content"
                                height={"fit-content"}
                            >
                                <BrowseOrganizationButton />
                            </AccordionButton>
                        </Box>
                    </AccordionItem>
            </Accordion>

        </Box>

)
}
