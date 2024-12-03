package com.quickcheck.calendar;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public record CalendarEventRegistrationRequest(
        String title,
        String description,
        ZonedDateTime start,
        ZonedDateTime end,
        Integer creatorId,
        Integer classId
) {
}
