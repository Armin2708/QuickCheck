package com.quickcheck.user;

import com.quickcheck.Gender;

import java.time.LocalDate;

public record UserRegistrationRequest(
         String name,
         String address,
         String email,
         String password,
         LocalDate dateOfBirth,
         Gender gender
) {
}
