package com.quickcheck.calendar;

import java.util.List;
import java.util.Optional;

public interface CalendarEventDao {

    List<CalendarEvent> selectAllEvents();
    List<CalendarEvent> selectAllClassEvents(Integer classId);
    List<CalendarEvent> selectAllUserEvents(Integer userId);

    Optional<CalendarEvent> selectEventById(Integer eventId);

    void insertEvent(CalendarEvent event);

    void updateEvent(CalendarEvent update);

    void deleteEvent(Integer eventId);

    boolean existEventById(Integer eventId);
}
