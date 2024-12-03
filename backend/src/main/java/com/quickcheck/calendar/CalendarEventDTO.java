package com.quickcheck.calendar;

import java.time.ZonedDateTime;

public record CalendarEventDTO(
        Integer id,
        String title,
        String description,
        ZonedDateTime start,
        ZonedDateTime end,
        Integer creatorId,
        Integer classId,
        Boolean editable
) {
}
