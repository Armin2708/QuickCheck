import {Box, Button, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import CreateEventModal from "../../calendar/create/CreateEventModal.jsx";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {AnimatePresence, motion} from "framer-motion";
import EventPopOver from "../../calendar/EventPopOver.jsx";
import {useState} from "react";
import "./Calendar.css";
import {updateEvent} from "../../../services/client/calendarEvent.js";

const MotionBox = motion(Box);

export default function MyCalendar({onSuccess,events,setEvents, editable, fullUser, classId, isAdmin, isProfessor}){

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedDate, setSelectedDate] = useState();
    const [selectedEvent, setSelectedEvent] = useState();
    const [tooltipPosition, setTooltipPosition] = useState(null);

    const updateSelectedEvent = (eventId,update) =>{
        updateEvent(eventId,update)
            .then(() =>{
                onSuccess();
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    const handleOpenCreateEvent = (info) => {
            const selectedDate = new Date(info.date);
            const formattedDate = selectedDate.toISOString().split("T")[0];
            setSelectedDate(formattedDate);
            if (editable) onOpen();
    };

    const handleOpenEvent = (info) => {
        const rect = info.el.getBoundingClientRect();
        const calendarContainer = document.querySelector(".fc-view-harness");

        const containerRect = calendarContainer?.getBoundingClientRect() || { left: 0, top: 0 };

        const event = events.find(event => String(event.id) === String(info.event.id));

        setSelectedEvent(event);

        setTooltipPosition({
            left: rect.left - containerRect.left + rect.width / 8,
            top: rect.bottom - containerRect.top + 180, // Adjusted for proper position below the event
        });
    };

    const handleEventDrop = (info) => {
        //Check based on event.editable value
        const eventId = info.event.id

        const event = events.find(event => String(event.id) === String(eventId));

        const updatedEvent = {
            title: event.title,
            description: event.description,
            start: info.event.start.toISOString(),
            end: info.event.end.toISOString()
        }
        updateSelectedEvent(eventId,updatedEvent)
    };

    const handleEventResize = (info) => {
        //Check based on event.editable value
        const eventId = info.event.id

        const event = events.find(event => String(event.id) === String(eventId));

        const updatedEvent = {
            title: event.title,
            description: event.description,
            start: info.event.start.toISOString(),
            end: info.event.end.toISOString(),
        };
        updateSelectedEvent(eventId, updatedEvent)
    };

    const handleCloseTooltip = () => {
        setTooltipPosition(null);
        setSelectedEvent(null);
    };

    return (
        <>
            <CreateEventModal
                isCreateOpen={isOpen}
                onCloseCreate={onClose}
                selectedDate={selectedDate}
                setEvents={setEvents}
                onSuccess={onSuccess}
                fullUser={fullUser}
                classId={classId}
            />

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height={"100%"}
                events={events}
                dateClick={handleOpenCreateEvent}
                eventClick={handleOpenEvent}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
                editable={editable}
                eventResizableFromStart={editable}
                eventClassNames="event-event"
                dayMaxEventRows={true}
                dayMaxEvents={3}
                expandRows={true}
                moreLinkText={(num) => `+${num} more`}
                views={{
                    timeGrid: {
                        slotDuration: "01:00:00",
                    },
                }}
                eventTimeFormat={{
                    hour: "numeric",
                    minute: "2-digit",
                    meridiem: "short",
                }}
            />

            <AnimatePresence>
                {tooltipPosition && selectedEvent && (
                    <MotionBox
                        position="absolute"
                        left={`${tooltipPosition.left}px`}
                        top={`${tooltipPosition.top}px`}
                        bg={() =>useColorModeValue("#FBFBFB","#1F1F1F")}
                        color="white"
                        p={4}
                        borderRadius="md"
                        boxShadow="lg"
                        zIndex={1000}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <EventPopOver setEvents={setEvents} events={events} selectedEvent={selectedEvent} onSuccess={onSuccess} onClose={handleCloseTooltip} isAdmin={isAdmin} isProfessor={isProfessor} />
                        <Button
                            mt={4}
                            size="sm"
                            colorScheme="red"
                            onClick={handleCloseTooltip}
                            float="right"
                        >
                            Close
                        </Button>
                    </MotionBox>
                )}
            </AnimatePresence>
        </>
    )
}