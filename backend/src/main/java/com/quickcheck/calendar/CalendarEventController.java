package com.quickcheck.calendar;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/calendar")
public class CalendarEventController {

    private final CalendarEventService calendarEventService;

    public CalendarEventController(CalendarEventService calendarEventService) {
        this.calendarEventService = calendarEventService;
    }

    @GetMapping
    public List<CalendarEventDTO> getAllEvents(){
        return calendarEventService.getAllEvents();
    }

    @GetMapping("user/{userId}")
    public List<CalendarEventDTO> getAllUserEvents(
            @PathVariable("userId") Integer userId
    ){
        return calendarEventService.getAllUserEvents(userId);
    }

    @GetMapping("class/{classId}")
    public List<CalendarEvent> getAllClassEvents(
            @PathVariable("classId") Integer classId
    ){
        return calendarEventService.getAllClassEvents(classId);
    }

    @GetMapping("classes/user/{userId}")
    public List<CalendarEventDTO> getAllUserClassesEvents(
            @PathVariable("userId") Integer userId
    ){
        return calendarEventService.getAllUserClassesEvents(userId);
    }

    @GetMapping("event/{eventId}")
    public CalendarEventDTO getEvent(
            @PathVariable("eventId") Integer eventId
    ){
        return calendarEventService.getEventById(eventId);
    }
    @PostMapping
    public void registerEvent(
            @RequestBody CalendarEventRegistrationRequest request
    ){
        calendarEventService.addEvent(request);
    }

    @PutMapping("{eventId}")
    public void updateEvent(
            @PathVariable("eventId") Integer eventId,
            @RequestBody CalendarEventUpdateRequest update
    ){
        calendarEventService.updateEvent(eventId,update);
    }

    @DeleteMapping("{eventId}")
    public void deleteEvent(
            @PathVariable("eventId") Integer eventId
    ){
        calendarEventService.deleteEvent(eventId);
    }
}
