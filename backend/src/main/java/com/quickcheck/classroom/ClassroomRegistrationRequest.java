package com.quickcheck.classroom;

public record ClassroomRegistrationRequest(
        String roomName,
        String location,
        Integer capacity,
        Integer organizationId
) {
}