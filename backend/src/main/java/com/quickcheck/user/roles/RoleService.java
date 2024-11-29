package com.quickcheck.user.roles;

import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.organization.OrganizationDao;
import com.quickcheck.user.UserDao;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    private final RoleDao roleDao;
    private final UserDao userDao;
    private final OrganizationDao organizationDao;

    public RoleService(RoleDao roleDao, UserDao userDao, OrganizationDao organizationDao) {
        this.roleDao = roleDao;
        this.userDao = userDao;
        this.organizationDao = organizationDao;
    }

    private void checkIfUserExists(Integer userId){
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("User with id [%s] not found".formatted(userId));
        }
    }
    private void checkIfOrganizationExists(String organizationName){
        if (!organizationDao.existOrganizationByName(organizationName)){
            throw new ResourceNotFoundException("Organization with name [%s] not found".formatted(organizationName));
        }
    }
    private void checkIfRoleExists(Integer roleId){
        if (!roleDao.existRoleById(roleId)){
            throw new ResourceNotFoundException("Role with id [%s] not found".formatted(roleId));
        }
    }

    private void checkIfUserInOrganization(Integer userId, String organizationName){
        if (!userDao.existUserInOrganization(userId,organizationName)){
            throw new ResourceNotFoundException("User with id [%s] is not in Organization with Name [%s]".formatted(userId,organizationName));
        }
    }

    public void addUserRole(Integer userId,UserRolesUpdateRequest request){
        checkIfUserExists(userId);
        checkIfOrganizationExists(request.organizationName());
        checkIfUserInOrganization(userId,request.organizationName());

        roleDao.deleteAllUsersOrganizationRoles(userId, request.organizationName());

        for (RolesTitle roleTitle : request.roles()) {
            Role role = new Role(
                    userId,
                    roleTitle,
                    request.organizationName()
            );
            roleDao.insertRole(role);
        }
    }

    public void deleteUserRole(Integer roleId){
        checkIfRoleExists(roleId);
        roleDao.deleteRole(roleId);
    }
}
