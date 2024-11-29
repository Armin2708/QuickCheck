package com.quickcheck.user;

import com.quickcheck.Gender;
import com.quickcheck.user.roles.RoleDTO;
import com.quickcheck.user.roles.RolesTitle;

import java.time.LocalDate;
import java.util.List;

public record UserDTO (
        Integer id,
        String name,
        String address,
        String email,
        LocalDate dateOfBirth,
        Gender gender,
        List<String> accountType,
        List<RoleDTO> roles,
        String username,
        String profileImageId){
}
