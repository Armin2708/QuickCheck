package com.quickcheck.user;

import com.quickcheck.Gender;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public record UserRegistrationRequest(
         String name,
         String address,
         String email,
         String password,
         LocalDate dateOfBirth,
         Gender gender
) {
}
