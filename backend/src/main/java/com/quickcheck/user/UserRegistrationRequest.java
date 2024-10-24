package com.quickcheck.user;

import com.quickcheck.Gender;

import java.util.List;

public record UserRegistrationRequest(
         String schoolName,
         String name,
         String address,
         String email,
         String password,
         String dateOfBirth,
         Gender gender,
         List<String> roles
) {
}
