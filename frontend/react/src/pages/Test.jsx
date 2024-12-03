import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ChakraProvider, Box, Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import MyCalendar from "../components/shared/calendar/MyCalendar.jsx";

const MotionBox = motion(Box);

const Test = () => {
    const [events, setEvents] = useState([
        { id: "1", title: "All Day Event", start: new Date().toISOString().split("T")[0] },
        {
            id: "2",
            title: "Long Event",
            start: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
            end: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
        },
        {
            id: "3",
            title: "Repeating Event",
            start: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
        },
    ]);

    const [tooltipState, setTooltipState] = useState({
        isOpen: false,
        event: null,
        position: { left: 0, top: 0 },
    });

    const handleDateSelect = (selectInfo) => {
        const title = prompt("Enter event title:");
        if (title) {
            const newEvent = {
                id: `${events.length + 1}`,
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            };
            setEvents([...events, newEvent]);
        }
    };

    const handleEventClick = (clickInfo) => {
        const { clientX, clientY } = clickInfo.jsEvent;

        setTooltipState({
            isOpen: true,
            event: {
                id: clickInfo.event.id,
                title: clickInfo.event.title,
                start: clickInfo.event.start.toISOString(),
                end: clickInfo.event.end?.toISOString() || "N/A",
            },
            position: { left: clientX + 10, top: clientY + 10 },
        });
    };

    const handleCloseTooltip = () => {
        setTooltipState({ isOpen: false, event: null, position: { left: 0, top: 0 } });
    };

    return (
        <Box height={"100vh"}>
            <MyCalendar/>
        </Box>
    );
};

export default Test;