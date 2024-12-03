package com.quickcheck.calendar;

import java.time.ZonedDateTime;

public record CalendarEventUpdateRequest(
        String title,
        String description,
        ZonedDateTime start,
        ZonedDateTime end
) {
}
