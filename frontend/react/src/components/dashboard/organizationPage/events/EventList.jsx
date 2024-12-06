import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";
import EventCard from "./EventCard.jsx";

export default function EventList({ events, isAdmin, onSuccess}) {
    // Group events by local date and create an array of grouped objects
    const groupedEvents = events.reduce((grouped, event) => {
        // Convert UTC time to local date
        const localDate = new Date(event.dateTime).toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        // Initialize group if not present
        if (!grouped[localDate]) {
            grouped[localDate] = [];
        }

        // Add event to the group
        grouped[localDate].push(event);

        return grouped;
    }, {});

    // Format grouped events into an array for rendering
    const groupedEventsArray = Object.entries(groupedEvents).map(([date, events]) => ({
        date,
        events,
    }));

    return (
        <VStack spacing="20px">
            {groupedEventsArray.map((group) => {
                // Extract day name and formatted date
                const date = new Date(group.date);
                const dayName = date.toLocaleDateString(undefined, { weekday: "long" });
                const formattedDate = date.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" });

                return (
                    <Box
                        key={group.date}
                        width="100%"
                        padding="10px"
                        borderRadius="md"
                        boxShadow="sm"
                    >
                        <Text fontWeight="bold" fontSize="lg" marginBottom="10px">
                            {`${dayName}, ${formattedDate}`}
                        </Text>
                        <VStack spacing="5px" align="stretch">
                            {group.events.map((event) => (
                                <EventCard key={event.id} event={event} onSuccess={onSuccess} isAdmin={isAdmin}/>
                            ))}
                        </VStack>
                    </Box>
                );
            })}
        </VStack>
    );
}