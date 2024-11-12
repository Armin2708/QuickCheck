package com.quickcheck.user;

import com.quickcheck.Gender;

import java.time.LocalDate;
import java.util.List;

public record UserDTO (
        Integer id,
        String name,
        String address,
        String email,
        LocalDate dateOfBirth,
        Gender gender,
        List<String> roles,
        String username,
        String profileImageId){

}
