package com.quickcheck.chat;

public record ChatRegistrationRequest(
        String name,
        Integer classId
) {
}
