package com.quickcheck.organization;

import java.util.List;
import java.util.Optional;

public interface OrganizationDao {
    List<Organization> selectAllOrganizations();

    Optional<Organization> selectOrganizationById(Integer id);
    Optional<Organization> selectOrganizationByName(String name);

    void insertOrganization(Organization organization);

    void joinOrganization(Integer orgId, Integer userId);
    void leaveOrganization(Integer orgId, Integer userId);

    boolean existUserInOrganization(Integer orgId, Integer userId);

    boolean existOrganizationById(Integer id);
    boolean existOrganizationByName(String name);

    void updateOrganization(Organization update);

    void deleteOrganizationById(Integer id);

    List<Organization> selectAllOrganizationsOfUser(Integer id);

}