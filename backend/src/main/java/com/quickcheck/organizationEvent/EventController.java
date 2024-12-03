package com.quickcheck.organizationEvent;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/event")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getAllEvents(){
        return eventService.getAllEvents();
    }

    @GetMapping("/organization/{organizationId}")
    public List<Event> getAllOrganizationEvents(
            @PathVariable("organizationId")Integer organizationId
    ){
        return eventService.getAllOrganizationEvents(organizationId);
    }

    @GetMapping("{eventId}")
    public Event getEvent(
            @PathVariable("eventId") Integer eventId
    ){
        return eventService.getEventById(eventId);
    }

    @PostMapping
    public void registerEvent(
            @RequestBody EventRegistrationRequest request
    ){
        eventService.addEvent(request);
    }

    @PutMapping("{eventId}")
    public void updateEvent(
            @PathVariable("eventId") Integer eventId,
            @RequestBody EventUpdateRequest request
    ){
        eventService.updateEvent(eventId,request);
    }

    @DeleteMapping("{eventId}")
    public void deleteEvent(
            @PathVariable("eventId") Integer eventId
    ){
        eventService.deleteEvent(eventId);
    }
}
