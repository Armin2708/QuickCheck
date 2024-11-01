package com.quickcheck.user;

import com.quickcheck.Roles;

import java.util.List;

public record UserRolesUpdateRequest(
        List<Roles> roles
) {
}
