package com.quickcheck.user;

import com.quickcheck.Gender;
import com.quickcheck.Roles;

import java.util.Date;
import java.util.List;

public record UserUpdateRequest(
        String name,
        String address,
        String email,
        String password,
        Date dateOfBirth,
        Gender gender,
        List<Roles> roles
) {
}
