import {Box, HStack, Spacer, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import React from "react";
import UpdateEventButton from "../../../calendar/update/UpdateEventButton.jsx";
import DeleteOrganizationEventButton from "./delete/DeleteOrganizationEventButton.jsx";
import UpdateOrganizationEventButton from "./update/UpdateOrganizationEventButton.jsx";

export default function EventCard({event, isAdmin, onSuccess}){

    return (
            <Box
                padding="10px"
                background={useColorModeValue("#FBFBFB", "#1F1F1F")}
                borderRadius="md"
                borderLeft="4px solid purple.500"
                display="inline-block" // Enable flex layout
                flexDirection="column" // Ensure vertical stacking
                gap="10px" // Add spacing between children
            >
                <HStack>
                {/* Format dateTime to show only HH:MM */}
                <Box
                    background={useColorModeValue("#EAF0F5", "#2F2F2F")}
                    display="inline-block" // Make the box shrink-wrap its content
                    paddingY="6px"
                    paddingX="10px"
                    borderRadius="md"
                >
                    <Text padding="0px">{new Date(event?.dateTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Text>
                </Box>
                <Box padding="10px" >
                    <Text fontSize={"lg"} fontWeight={"bold"}>{event?.name}</Text>
                    <Text>{event?.location && `Location : ${event?.location}`}</Text>
                    <Text>{event?.description}</Text>
                </Box>
                    <Spacer/>
                        {isAdmin() &&
                            <HStack>
                                <UpdateOrganizationEventButton event={event} onSuccess={onSuccess}/>
                                <DeleteOrganizationEventButton eventId={event?.id} onSuccess={onSuccess}/>
                            </HStack>
                        }
                    </HStack>
            </Box>
    );
}