package com.quickcheck.organization.joinCode;

import java.util.List;
import java.util.Optional;

public interface OrganizationJoinCodeDao {

    List<OrganizationJoinCode> selectAllOrganizationJoinCodeFromOrganization(Integer organizationId);

    Optional<OrganizationJoinCode> selectOrganizationJoinCodeById(Integer id);
    Optional<OrganizationJoinCode> selectOrganizationJoinCodeByCode(Integer code);


    boolean existOrganizationJoinCodeById(Integer id);
    boolean existOrganizationJoinCodeByCode(Integer code);

    void insertOrganizationJoinCode(OrganizationJoinCode organizationJoinCode);

    void updateOrganizationJoinCode(Integer id, OrganizationJoinCode update);

    void deleteOrganizationJoinCode(Integer id);
}
