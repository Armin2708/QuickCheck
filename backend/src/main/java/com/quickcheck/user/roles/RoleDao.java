package com.quickcheck.user.roles;

import java.util.List;

public interface RoleDao {

    List<Role> selectUserOrganizationRoles(Integer userId, String organizationName);

    List<Role> selectUserOrganizationRolesInClass(Integer userId, Integer classId);

    List<Role> selectUserRoles(Integer userId);

    void insertRole(Role role);

    void deleteRole(Integer roleId);

    boolean existRoleById(Integer roleId);

    void deleteAllUsersOrganizationRoles(Integer userId, String organizationName);

}
