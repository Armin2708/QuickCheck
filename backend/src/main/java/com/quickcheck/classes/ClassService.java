package com.quickcheck.classes;

import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.organization.OrganizationDao;
import com.quickcheck.user.UserDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService {

    private final ClassDao classDao;
    private final OrganizationDao organizationDao;
    private final UserDao userDao;

    public ClassService(ClassDao classDao, OrganizationDao organizationDao, UserDao userDao) {
        this.classDao = classDao;
        this.organizationDao = organizationDao;
        this.userDao = userDao;
    }

    public List<Class> getAllClasses() {
        return classDao.selectAllClasses();
    }

    public List<Class> getClassesOfOrganization(String organizationName) {
        if (!organizationDao.existOrganizationByName(organizationName)){
            throw new ResourceNotFoundException("Organization with name %s not found".formatted(organizationName));
        }
        Integer organizationId = organizationDao.selectOrganizationByName(organizationName).get().getId();
        return classDao.selectClassesOfOrganization(organizationId);
    }

    public Class getClassById(Integer classId) {
        return classDao.selectClassById(classId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Class with id [%s] not found".formatted(classId)
                ));
    }

    public List<Class> getClassesOfUserInOrganization(String orgName,Integer userId) {
        if (!organizationDao.existOrganizationByName(orgName)){
            throw new ResourceNotFoundException("Organization with name %s not found".formatted(orgName));
        }

        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("User with id %s not found".formatted(userId));
        }

        Integer orgId = organizationDao.selectOrganizationByName(orgName).get().getId();

        return classDao.selectClassesOfUserInOrganization(userId,orgId);

    }

    public void addClass(ClassRegistrationRequest request) {

        Integer organizationId = organizationDao.selectOrganizationByName(request.organizationName()).get().getId();

        Class classObject = new Class(
                request.name(),
                request.professorId(),
                request.startDate(),
                request.endDate(),
                request.classroomId(),
                organizationId
        );
        classDao.insertClass(classObject);
    }

    public void joinClass(Integer classId, Integer userId){
        if (!classDao.existClassById(classId)){
            throw new ResourceNotFoundException("No class found with id %s".formatted(classId));
        }
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("No user found with id %s".formatted(userId));
        }
        if (classDao.existUserInClass(classId, userId)){
            throw new DuplicateResourceException("User %s already in Class %s".formatted(userId,classId));
        }

        classDao.joinClass(classId,userId);

    }

    public void leaveClass(Integer classId, Integer userId){
        if (!classDao.existClassById(classId)){
            throw new ResourceNotFoundException("No class found with id %s".formatted(classId));
        }
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("No user found with id %s".formatted(userId));
        }
        if (!classDao.existUserInClass(classId, userId)){
            throw new DuplicateResourceException("User %s already in Class %s".formatted(userId,classId));
        }

        classDao.leaveClass(classId,userId);
    }

    public void updateClass(Integer classId, ClassUpdateRequest classUpdateRequest) {
        Class classObject = classDao.selectClassById(classId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Class with id [%s] not found".formatted(classId)
                ));
        boolean changes = false;

        // Check and update name
        if (classUpdateRequest.name() != null && !classUpdateRequest.name().equals(classObject.getName())) {
            classObject.setName(classUpdateRequest.name());
            changes = true;
        }

        // Check and update professorId
        if (classUpdateRequest.professorId() != null && !classUpdateRequest.professorId().equals(classObject.getProfessorId())) {
            classObject.setProfessorId(classUpdateRequest.professorId());
            changes = true;
        }

        // Check and update startDate
        if (classUpdateRequest.startDate() != null && !classUpdateRequest.startDate().equals(classObject.getStartDate())) {
            classObject.setStartDate(classUpdateRequest.startDate());
            changes = true;
        }

        // Check and update endDate
        if (classUpdateRequest.endDate() != null && !classUpdateRequest.endDate().equals(classObject.getEndDate())) {
            classObject.setEndDate(classUpdateRequest.endDate());
            changes = true;
        }

        // Check and update classroomId
        if (classUpdateRequest.classroomId() != null && !classUpdateRequest.classroomId().equals(classObject.getClassroomId())) {
            classObject.setClassroomId(classUpdateRequest.classroomId());
            changes = true;
        }



        // If no changes were made, throw an exception
        if (!changes) {
            throw new RequestValidationException("No data changes found");
        }

        // Update the class in the database
        classDao.updateClass(classObject);
    }


    public void deleteClass(Integer classId) {
        if (!classDao.existClassById(classId)){
            throw new ResourceNotFoundException("Class with id [%s] not found".formatted(classId));
        }
        classDao.deleteClassById(classId);
    }
}