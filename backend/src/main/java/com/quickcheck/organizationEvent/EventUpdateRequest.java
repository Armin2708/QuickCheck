package com.quickcheck.organizationEvent;

import java.time.ZonedDateTime;

public record EventUpdateRequest(
        String name,
        ZonedDateTime dateTime,
        String location,
        String description
) {
}
