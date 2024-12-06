import {Box, Divider, Stack, Text} from "@chakra-ui/react";
import {getOrganizationEvents} from "../../../../services/client/organizationEvent.js";
import React, {useEffect, useState} from "react";
import EventList from "./EventList.jsx";
import CreateOrganizationEventButton from "./create/CreateOrganizationEventButton.jsx";

export default function EventsComponent({organizationId, isAdmin, fullUser}){

    const [events, setEvents] = useState([])

    const fetchOrganizationEvents = () =>{
        getOrganizationEvents(organizationId)
            .then((res) =>{
                setEvents(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    useEffect(() => {
        if (organizationId){
            fetchOrganizationEvents();
        }
    }, [organizationId]);


    return(
        <Box
            paddingTop="10px"
            paddingX="30px"
            width="100%"
            height="80vh" // Constrain height
            boxShadow="md"
            borderRadius="lg"
            overflowY="auto" // Enable scrolling
        >
            <Text fontWeight="bold" fontSize="2xl" marginBottom="20px" textAlign="center">
                Event Calendar
            </Text>
            <Divider marginBottom="20px" />
            {isAdmin() && <CreateOrganizationEventButton organizationId={organizationId} onSuccess={fetchOrganizationEvents}/>}
            <EventList events={events} isAdmin={isAdmin} onSuccess={fetchOrganizationEvents}/>
        </Box>
    )
}