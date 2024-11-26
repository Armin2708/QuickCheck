package com.quickcheck.organization.joinCode;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class OrganizationJoinCodeResponseMapper implements Function<OrganizationJoinCode, OrganizationVerifyCodeResponse> {
    @Override
    public OrganizationVerifyCodeResponse apply(OrganizationJoinCode organizationJoinCode) {
        return new OrganizationVerifyCodeResponse(
                organizationJoinCode.getOrganizationId()
        );
    }
}
