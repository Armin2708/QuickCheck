import {
    Box, Divider, HStack,
    PopoverBody, Text, useColorModeValue, VStack,

} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import UpdateEventButton from "./update/UpdateEventButton.jsx";
import DeleteEventButton from "./delete/DeleteEventButton.jsx";

export default function EventPopOver({onSuccess, selectedEvent, updateEvent, onClose, isAdmin, isProfessor}){

    const formatDateRange = (startISO, endISO) =>{
        const startDate = new Date(startISO);
        const endDate = new Date(endISO);

        const optionsDate = { month: 'short', day: 'numeric', year: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

        const startDateString = startDate.toLocaleDateString('en-US', optionsDate);
        const startTimeString = startDate.toLocaleTimeString('en-US', optionsTime);

        const endDateString = endDate.toLocaleDateString('en-US', optionsDate);
        const endTimeString = endDate.toLocaleTimeString('en-US', optionsTime);

        if (startDateString === endDateString) {
            // Same day event
            return `${startDateString}, ${startTimeString} to ${endTimeString}`;
        } else {
            // Multi-day event
            return `${startDateString}, ${startTimeString} to ${endDateString}, ${endTimeString}`;
        }
    }


    return(

                <VStack color={()=>useColorModeValue("black","white")} spacing={"10px"} >
                    <Text fontWeight={"bold"} fontSize={"large"}>
                        {selectedEvent.title}
                    </Text>
                    <Text textAlign={"left"}>
                        {selectedEvent.description}
                    </Text>
                    <Divider/>
                    <Text textAlign={"left"}>
                        {formatDateRange(selectedEvent.start,selectedEvent.end)}
                    </Text>
                    {(selectedEvent.editable===true || isAdmin() || isProfessor) ?
                        <HStack>
                            <UpdateEventButton selectedEvent={selectedEvent} updateEvent={updateEvent} onSuccess={onSuccess}/>
                            <DeleteEventButton selectedEvent={selectedEvent} onSuccess={onSuccess} onClose={onClose}/>
                        </HStack>
                        : null
                    }
                </VStack>

    )
}