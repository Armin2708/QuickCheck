package com.quickcheck.organizationEvent;

import java.util.List;
import java.util.Optional;

public interface EventDao {

    List<Event> selectAllEvents();
    List<Event> selectAllOrganizationEvents(Integer organizationId);

    Optional<Event> selectEventById(Integer eventId);

    void insertEvent(Event event);

    boolean existEventById(Integer eventId);

    void updateEvent(Event update);

    void deleteEvent(Integer eventId);
}
