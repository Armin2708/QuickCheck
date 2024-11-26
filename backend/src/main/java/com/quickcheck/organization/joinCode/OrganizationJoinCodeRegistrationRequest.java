package com.quickcheck.organization.joinCode;

public record OrganizationJoinCodeRegistrationRequest(
        Integer organizationId,
        Integer usageLimit,
        Integer creatorId
) {
}
