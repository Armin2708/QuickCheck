package com.quickcheck.classroom;

public record ClassroomUpdateRequest(
        String roomName,
        String location,
        Integer capacity
) {
}