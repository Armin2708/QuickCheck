import React, { useState } from "react";
import { Box, Text, VStack, HStack, Divider } from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";

const Events = ({ name:orgName }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const tasks = {
        Monday: ["Team meeting at 10 AM", "Project deadline at 3 PM"],
        Tuesday: ["Doctor's appointment at 2 PM", "Gym session at 5 PM"],
        Wednesday: ["Work on report", "Dinner with friends"],
        Thursday: ["Client presentation at 1 PM"],
        Friday: ["Submit weekly update", "Watch a movie"],
        Saturday: ["Family picnic", "Grocery shopping"],
        Sunday: ["Relax and plan next week"],
    };

    // Get the week range based on the selected date
    const getWeekRange = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Set to Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Sunday

        return { startOfWeek, endOfWeek };
    };

    const { startOfWeek, endOfWeek } = getWeekRange(selectedDate);

    // Get tasks for the week
    const getTasksForDay = (date) => {
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        return tasks[dayName] || [];
    };

    return (
        <Box
            paddingTop="10px"
            paddingX={"30px"}
            width="100%"
            height="80vh" // Set a height constraint relative to the viewport
            boxShadow="md"
            borderRadius="lg"
            overflowY="auto" // Enables vertical scrolling
        >
            <Text fontWeight="bold" fontSize="2xl" marginBottom="20px" textAlign="center">
                {orgName} Weekly Calendar W.I.P.
            </Text>
            <Divider marginBottom="20px" />

            <Text fontWeight="semibold" fontSize="lg" textAlign="center" marginBottom="10px">
                Week of {startOfWeek.toLocaleDateString()} - {endOfWeek.toLocaleDateString()}
            </Text>

            <VStack spacing="10px">
                {Array.from({ length: 7 }).map((_, index) => {
                    const currentDay = new Date(startOfWeek);
                    currentDay.setDate(startOfWeek.getDate() + index);
                    const dayName = currentDay.toLocaleDateString("en-US", { weekday: "long" });

                    return (
                        <Box
                            key={index}
                            width="100%"
                            padding="10px"
                            background="gray.100"
                            borderRadius="md"
                            boxShadow="sm"
                        >
                            <Text fontWeight="bold" fontSize="lg" marginBottom="10px" color="purple.700">
                                {dayName} ({currentDay.toLocaleDateString()})
                            </Text>
                            <VStack spacing="5px" align="stretch">
                                {getTasksForDay(currentDay).length > 0 ? (
                                    getTasksForDay(currentDay).map((task, taskIndex) => (
                                        <Box
                                            key={taskIndex}
                                            padding="8px"
                                            background="purple.50"
                                            borderRadius="md"
                                            borderLeft="4px solid purple.500"
                                        >
                                            <Text>{task}</Text>
                                        </Box>
                                    ))
                                ) : (
                                    <Text color="gray.500">No tasks for today</Text>
                                )}
                            </VStack>
                        </Box>
                    );
                })}
            </VStack>
        </Box>

    );
};

export default Events;
