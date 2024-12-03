import {Button} from "@chakra-ui/react";
import React from "react";
import {deleteEvent} from "../../../services/client/calendarEvent.js";
import {errorNotification, successNotification} from "../../../services/notification.js";

export default function DeleteEventButton({onSuccess, selectedEvent, onClose}){

    const handleDeleteEvent = (eventId) => {
        deleteEvent(eventId)
            .then(()=>{
                successNotification("Delete Success", "Event deleted successfully")
                onSuccess()
                onClose()
            })
            .catch((err) =>{
                errorNotification(
                    err.code,
                    err.response?.data?.message
                )
            })
    }

    return(

        <Button
            onClick={() => {
                handleDeleteEvent(selectedEvent?.id)
            }}
        >
            Delete Event
        </Button>
    )
}