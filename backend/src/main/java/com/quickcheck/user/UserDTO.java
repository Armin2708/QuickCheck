package com.quickcheck.user;

import com.quickcheck.Gender;

import java.util.Date;
import java.util.List;

public record UserDTO (
        Integer id,
        String name,
        String address,
        String email,
        Date dateOfBirth,
        Gender gender,
        List<String> roles,
        String username
){

}
