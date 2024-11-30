package com.quickcheck.event;

import java.time.LocalDateTime;

public record EventRegistrationRequest(
        String name,
        LocalDateTime dateTime,
        String location,
        Integer organizationId,
        String description
) {
}
