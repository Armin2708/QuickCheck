package com.quickcheck.admin;

import com.quickcheck.Gender;

import java.util.List;

public record AdminUpdateRequest(
        String schoolName,
        String name,
        String address,
        String email,
        String password,
        String dateOfBirth,
        Gender gender,
        List<Integer> classesId
) {
}