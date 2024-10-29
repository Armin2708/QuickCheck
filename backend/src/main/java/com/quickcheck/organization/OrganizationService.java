package com.quickcheck.organization;

import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.user.UserDao;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OrganizationService {

    private final OrganizationDao organizationDao;
    private final UserDao userDao;


    public OrganizationService(OrganizationDao organizationDao, UserDao userDao) {
        this.organizationDao = organizationDao;
        this.userDao = userDao;
    }

    public List<Organization> getAllOrganizations() {
        return organizationDao.selectAllOrganizations();
    }

    public List<Organization> getOrganizationsOfUser(Integer userId) {
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("User with id %s does not exist".formatted(userId));
        }
        return organizationDao.selectAllOrganizationsOfUser(userId);
    }

    public Organization getOrganizationById(Integer organizationId) {
        return organizationDao.selectOrganizationById(organizationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Organization with id [%s] not found".formatted(organizationId)
                ));
    }

    public Organization getOrganizationByName(String name) {
        return organizationDao.selectOrganizationByName(name)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Organization with id [%s] not found".formatted(name)
                ));
    }

    public void addOrganization(OrganizationRegistrationRequest request) {
        String name = request.name();
        if (organizationDao.existOrganizationByName(name)) {
            throw new DuplicateResourceException("Class name already exists");
        }
        Organization organization = new Organization(
                request.name()
        );
        organizationDao.insertOrganization(organization);
    }

    public void joinOrganization(Integer organizationId, Integer userId){
        if (!organizationDao.existOrganizationById(organizationId)){
            throw new ResourceNotFoundException("No organization found with id %s".formatted(organizationId));
        }
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("No user found with id %s".formatted(userId));
        }
        if (organizationDao.existUserInOrganization(organizationId, userId)){
            throw new DuplicateResourceException("User %s already in Organization %s".formatted(userId,organizationId));
        }

        organizationDao.joinOrganization(organizationId,userId);

    }

    public void leaveOrganization(Integer organizationId, Integer userId){
        if (!organizationDao.existOrganizationById(organizationId)){
            throw new ResourceNotFoundException("No organization found with id %s".formatted(organizationId));
        }
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("No user found with id %s".formatted(userId));
        }
        if (!organizationDao.existUserInOrganization(organizationId, userId)){
            throw new ResourceNotFoundException("User %s not found in Organization %s".formatted(userId,organizationId));
        }

        organizationDao.leaveOrganization(organizationId,userId);
    }


    public void updateOrganization(Integer organizationId, OrganizationUpdateRequest organizationUpdateRequest) {
        Organization organization = organizationDao.selectOrganizationById(organizationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Organization with id [%s] not found".formatted(organizationId)
                ));
        boolean changes = false;

        // Check and update name
        if (organizationUpdateRequest.name() != null && !organizationUpdateRequest.name().equals(organization.getName())) {
            if (organizationDao.existOrganizationByName(organizationUpdateRequest.name())) {
                throw new DuplicateResourceException("Organization name already taken");
            }
            organization.setName(organizationUpdateRequest.name());
            changes = true;
        }

        // If no changes were made, throw an exception
        if (!changes) {
            throw new RequestValidationException("No data changes found");
        }

        // Update the organization in the database
        organizationDao.updateOrganization(organization);
    }


    public void deleteOrganization(Integer organizationId) {
        if (!organizationDao.existOrganizationById(organizationId)){
            throw new ResourceNotFoundException("Organization with id [%s] not found".formatted(organizationId));
        }
        organizationDao.deleteOrganizationById(organizationId);
    }
}