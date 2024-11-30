package com.quickcheck.event;

import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.organization.OrganizationDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventDao eventDao;
    private final OrganizationDao organizationDao;

    public EventService(EventDao eventDao, OrganizationDao organizationDao) {
        this.eventDao = eventDao;
        this.organizationDao = organizationDao;
    }

    private void checkIfOrganizationExists(Integer organizationId){
        if (!organizationDao.existOrganizationById(organizationId)){
            throw new ResourceNotFoundException("Organization with id [%s] not found".formatted(organizationId));
        }
    }

    private void checkIfEventExists(Integer eventId){
        if (!eventDao.existEventById(eventId)){
            throw new ResourceNotFoundException("Event with id [%s] not found".formatted(eventId));
        }
    }

    public List<Event> getAllEvents(){
        return eventDao.selectAllEvents();
    }

    public List<Event> getAllOrganizationEvents(Integer organizationId){
        checkIfOrganizationExists(organizationId);
        return eventDao.selectAllOrganizationEvents(organizationId);
    }

    public Event getEventById(Integer eventId){
        checkIfEventExists(eventId);
        return eventDao.selectEventById(eventId).get();
    }

    public void addEvent(EventRegistrationRequest request){
        checkIfOrganizationExists(request.organizationId());
        Event event = new Event(
                request.name(),
                request.dateTime(),
                request.location(),
                request.organizationId(),
                request.description()
        );
        eventDao.insertEvent(event);
    }

    public void updateEvent(Integer eventId,EventUpdateRequest update){
        checkIfEventExists(eventId);
        Event event = eventDao.selectEventById(eventId).get();

        boolean changes = false;

        if (update.name()!=null && !update.name().equals(event.getName())){
            event.setName(update.name());
            changes=true;
        }
        if (update.dateTime()!=null && !update.dateTime().equals(event.getDateTime())){
            event.setDateTime(update.dateTime());
            changes=true;
        }
        if (update.location()!=null && !update.location().equals(event.getLocation())){
            event.setLocation(update.location());
            changes=true;
        }
        if (update.description()!=null && !update.description().equals(event.getDescription())){
            event.setDescription(update.description());
            changes=true;
        }

        if (!changes){
            throw new RuntimeException("No changes made");
        }

        eventDao.updateEvent(event);
    }

    public void deleteEvent(Integer eventId){
        checkIfEventExists(eventId);
        eventDao.deleteEvent(eventId);
    }
}
