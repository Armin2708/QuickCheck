package com.quickcheck.user;

import com.quickcheck.Gender;

import java.util.List;

public record UserDTO (
        Integer id,
        String schoolName,
        String name,
        String address,
        String email,
        String dateOfBirth,
        Gender gender,
        List<Integer> classesId,
        List<String> roles,
        String username
){

}
