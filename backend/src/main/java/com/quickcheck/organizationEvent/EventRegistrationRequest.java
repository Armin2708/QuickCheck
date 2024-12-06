package com.quickcheck.organizationEvent;

import java.time.ZonedDateTime;

public record EventRegistrationRequest(
        String name,
        ZonedDateTime dateTime,
        String location,
        Integer organizationId,
        String description
) {
}
