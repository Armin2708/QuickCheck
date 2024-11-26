package com.quickcheck.organization;

public record OrganizationJoinRequest(
        Integer userId,
        Integer code
) {
}
