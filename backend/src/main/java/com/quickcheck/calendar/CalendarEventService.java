package com.quickcheck.calendar;

import com.quickcheck.classes.Class;
import com.quickcheck.classes.ClassDao;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.user.UserDTO;
import com.quickcheck.user.UserDao;
import com.quickcheck.user.roles.RoleDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CalendarEventService {

    private final CalendarEventDao eventDao;
    private final UserDao userDao;
    private final ClassDao classDao;

    public CalendarEventService(CalendarEventDao eventDao, UserDao userDao, ClassDao classDao) {
        this.eventDao = eventDao;
        this.userDao = userDao;
        this.classDao = classDao;
    }

    private void checkIfUserExists(Integer userId){
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("User with id [%s] not found".formatted(userId));
        }
    }

    private void checkIfClassExists(Integer classId){
        if (!classDao.existClassById(classId)){
            throw new ResourceNotFoundException("Class with id [%s] not found".formatted(classId));
        }
    }

    private void checkIfEventExists(Integer eventId){
        if (!eventDao.existEventById(eventId)){
            throw new ResourceNotFoundException("Calendar Event with id [%s] not found".formatted(eventId));
        }
    }

    public List<CalendarEventDTO> getAllEvents(){
        return eventDao.selectAllEvents()
                .stream()
                .map(event -> new CalendarEventDTO(
                        event.getId(),
                        event.getTitle(),
                        event.getDescription(),
                        event.getStart(),
                        event.getEnd(),
                        event.getCreatorId(),
                        event.getClassId(),
                        false
                ))
                .collect(Collectors.toList());
    }

    public List<CalendarEventDTO> getAllUserEvents(Integer userId){
        checkIfUserExists(userId);
        return eventDao.selectAllUserEvents(userId)
                .stream()
                .map(event -> new CalendarEventDTO(
                        event.getId(),
                        event.getTitle(),
                        event.getDescription(),
                        event.getStart(),
                        event.getEnd(),
                        event.getCreatorId(),
                        event.getClassId(),
                        true
                ))
                .collect(Collectors.toList());
    }

    public List<CalendarEvent> getAllClassEvents(Integer classId){
        checkIfClassExists(classId);
        return eventDao.selectAllClassEvents(classId)
                /*.stream()
                .map(event -> new CalendarEventDTO(
                        event.getId(),
                        event.getTitle(),
                        event.getDescription(),
                        event.getStart(),
                        event.getEnd(),
                        event.getCreatorId(),
                        event.getClassId(),
                        true
                ))
                .collect(Collectors.toList())*/;
    }

    public List<CalendarEventDTO> getAllUserClassesEvents(Integer userId){
        checkIfUserExists(userId);

        List<Class> userClasses = classDao.selectUserClasses(userId);

        List<CalendarEventDTO> eventList = new ArrayList<>();

        for (Class userClass : userClasses) {
            List<CalendarEventDTO> classEvents = eventDao.selectAllClassEvents(userClass.getId())
                    .stream()
                    .map(event -> new CalendarEventDTO(
                            event.getId(),
                            event.getTitle(),
                            event.getDescription(),
                            event.getStart(),
                            event.getEnd(),
                            event.getCreatorId(),
                            event.getClassId(),
                            false
                    ))
                    .toList();
            eventList.addAll(classEvents);
        }

        return eventList;
    }

    public CalendarEventDTO getEventById(Integer eventId){
        checkIfEventExists(eventId);
        CalendarEvent event = eventDao.selectEventById(eventId).get();

        return new CalendarEventDTO(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getStart(),
                event.getEnd(),
                event.getCreatorId(),
                event.getClassId(),
                false
        );
    }

    public void addEvent(CalendarEventRegistrationRequest request){
        CalendarEvent event = new CalendarEvent(
                request.title(),
                request.description(),
                request.start(),
                request.end(),
                request.creatorId(),
                request.classId()
        );
        System.out.println(event);
        eventDao.insertEvent(event);
    }

    public void updateEvent(Integer eventId, CalendarEventUpdateRequest update){
        checkIfEventExists(eventId);
        CalendarEvent event = eventDao.selectEventById(eventId).get();

        boolean changes = false;

        if (update.title()!=null && !update.title().equals(event.getTitle())){
            event.setTitle(update.title());
            changes=true;
        }
        if (update.description()!=null && !update.description().equals(event.getDescription())){
            event.setDescription(update.description());
            changes=true;
        }
        if (update.start()!=null && !update.start().equals(event.getStart())){
            event.setStart(update.start());
            changes=true;
        }
        if (update.end()!=null && !update.end().equals(event.getEnd())){
            event.setEnd(update.end());
            changes=true;
        }

        if (!changes){
            throw new RuntimeException("No changes made");
        }

        System.out.println(event);
        eventDao.updateEvent(event);
    }

    public void deleteEvent(Integer eventId){
        checkIfEventExists(eventId);
        eventDao.deleteEvent(eventId);
    }
}
