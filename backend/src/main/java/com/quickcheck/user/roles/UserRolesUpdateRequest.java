package com.quickcheck.user.roles;

import java.util.List;

public record UserRolesUpdateRequest(
        List<RolesTitle> roles,
        String organizationName
) {
}
