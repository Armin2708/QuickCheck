package com.quickcheck.organizationEvent;

import java.time.LocalDateTime;

public record EventRegistrationRequest(
        String name,
        LocalDateTime dateTime,
        String location,
        Integer organizationId,
        String description
) {
}
