import React, { useEffect, useState } from "react";

import {getUserClassesEvents, getUserEvents} from "../../services/client/calendarEvent.js";
import { useAuth } from "../context/AuthContext.jsx";
import MyCalendar from "../shared/calendar/MyCalendar.jsx";
import {Box, useColorModeValue} from "@chakra-ui/react";


function Calendar() {
    const [events, setEvents] = useState([]);

    const { fullUser,isAdmin } = useAuth();

    const fetchEvents = () => {
        // Fetch user-specific events
        getUserEvents(fullUser?.id)
            .then((res) => {
                setEvents(res.data); // Set the first batch of events
                getUserClassesEvents(fullUser?.id)
                    .then((res) => {
                        setEvents(prevData => [...prevData, ...res.data]); // Spread res.data to avoid nested arrays
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });

        // Fetch class-specific events and merge them with user events
    };



    useEffect(() => {
        if (fullUser?.id) {
            fetchEvents();
        }
    }, [fullUser]);

    return (
        <Box height={"100%"} bg={()=>useColorModeValue("#FBFBFB","#1F1F1F")} padding={"20px"} borderRadius={"12px"}>
            <MyCalendar fullUser={fullUser} editable={true} events={events} setEvents={setEvents} onSuccess={fetchEvents} isAdmin={isAdmin} />
        </Box>
    );
}

export default Calendar;