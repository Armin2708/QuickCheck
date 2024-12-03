import {useEffect, useState} from "react";
import {getClassEvents} from "../../../../services/client/calendarEvent.js";

import {
    Box,

} from "@chakra-ui/react";

import MyCalendar from "../../../shared/calendar/MyCalendar.jsx";

export default function CalendarComponent({fullUser, professorId, classId, isAdmin}){

    const [events, setEvents] = useState([])
    const [editable, setEditable] = useState(false)


    const fetchClassEvents = () =>{
        getClassEvents(classId)
            .then((res) =>{
                setEvents(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    useEffect(() => {
        if (fullUser.id && professorId){
            if (fullUser.id===professorId || isAdmin()){
                setEditable(true)
            }
        }
    }, [fullUser, professorId]);

    useEffect(() => {
        if (classId){
            fetchClassEvents()
        }
    }, [classId]);


        return (
            <Box height={"70vh"}>
                <MyCalendar fullUser={fullUser} onSuccess={fetchClassEvents} events={events} setEvents={setEvents} editable={editable} classId={classId} isAdmin={isAdmin} isProfessor={editable}/>
            </Box>

    )
}