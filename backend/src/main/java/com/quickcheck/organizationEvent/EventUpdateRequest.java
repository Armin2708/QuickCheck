package com.quickcheck.organizationEvent;

import java.time.LocalDateTime;

public record EventUpdateRequest(
        String name,
        LocalDateTime dateTime,
        String location,
        String description
) {
}
