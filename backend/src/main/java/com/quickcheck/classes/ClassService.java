package com.quickcheck.classes;

import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.organization.OrganizationDao;
import com.quickcheck.s3.S3Buckets;
import com.quickcheck.s3.S3Service;
import com.quickcheck.user.UserDTO;
import com.quickcheck.user.UserDao;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ClassService {

    private final ClassDao classDao;
    private final OrganizationDao organizationDao;
    private final UserDao userDao;
    private final S3Buckets s3Buckets;
    private final S3Service s3Service;

    public ClassService(ClassDao classDao, OrganizationDao organizationDao, UserDao userDao, S3Buckets s3Buckets, S3Service s3Service) {
        this.classDao = classDao;
        this.organizationDao = organizationDao;
        this.userDao = userDao;
        this.s3Buckets = s3Buckets;
        this.s3Service = s3Service;
    }

    private void checkIfClassExists(Integer classId){
        if (!classDao.existClassById(classId)){
            throw new ResourceNotFoundException("No class found with id %s".formatted(classId));
        }
    }

    private void checkIfOrganizationExistsByName(String organizationName){
        if (!organizationDao.existOrganizationByName(organizationName)){
            throw new ResourceNotFoundException("Organization with name %s not found".formatted(organizationName));
        }
    }

    public List<Class> getAllClasses() {
        return classDao.selectAllClasses();
    }

    public List<Class> getClassesOfOrganization(String organizationName) {
        checkIfOrganizationExistsByName(organizationName);
        Integer organizationId = organizationDao.selectOrganizationByName(organizationName).get().getId();
        return classDao.selectClassesOfOrganization(organizationId);
    }

    public List<Class> getClassesOfOrganizationByNameSearch(String organizationName,String className) {
        checkIfOrganizationExistsByName(organizationName);
        Integer organizationId = organizationDao.selectOrganizationByName(organizationName).get().getId();
        return classDao.selectClassesOfOrganizationByNameSearch(organizationId, className+"%");
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

    public List<Class> getClassesOfProfessorInOrganization(String orgName,Integer professorId) {
        if (!organizationDao.existOrganizationByName(orgName)){
            throw new ResourceNotFoundException("Organization with name %s not found".formatted(orgName));
        }

        if (!userDao.existUserById(professorId)){
            throw new ResourceNotFoundException("professor with id %s not found".formatted(professorId));
        }

        Integer orgId = organizationDao.selectOrganizationByName(orgName).get().getId();

        return classDao.selectClassesOfProfessorInOrganization(professorId,orgId);

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
        Integer professorId=classDao.selectClassById(classId).get().getProfessorId();
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("No user found with id %s".formatted(userId));
        }
        if (classDao.existUserInClass(classId, userId)){
            throw new DuplicateResourceException("User %s already in Class %s".formatted(userId,classId));
        }
        if (professorId.equals(userId)){
            throw new DuplicateResourceException("User [%s] is the instructor".formatted(userId));
        }

        classDao.joinClass(classId,userId);

    }

    public void leaveClass(Integer classId, Integer userId){
        if (!classDao.existClassById(classId)){
            throw new ResourceNotFoundException("No class found with id %s".formatted(classId));
        }
        Integer professorId=classDao.selectClassById(classId).get().getProfessorId();
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("No user found with id %s".formatted(userId));
        }
        if (professorId.equals(userId)){
            throw new DuplicateResourceException("User [%s] is the instructor".formatted(userId));
        }
        if (!classDao.existUserInClass(classId, userId)){
            throw new DuplicateResourceException("User %s not in Class %s".formatted(userId,classId));
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

    public void uploadClassImage(Integer classId, MultipartFile file) {
        checkIfClassExists(classId);
        String imageId = UUID.randomUUID().toString();

        try {
            s3Service.putObject(
                    s3Buckets.getClasses(),
                    "profile-images/%s/%s".formatted(classId, imageId),
                    file.getBytes()
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        classDao.updateClassImageId(imageId,classId);
    }

    public byte[] getClassImage(Integer classId) {
        Class classObject = classDao.selectClassById(classId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "class with id [%s] not found".formatted(classId)
                ));

        if (StringUtils.isBlank(classObject.getImageId())){
            throw new ResourceNotFoundException(
                    "Class with id [%s], image not found".formatted(classId)
            );
        }

        byte[] image = s3Service.getObject(
                s3Buckets.getClasses(),
                "profile-images/%s/%s".formatted(classId, classObject.getImageId())
        );

        return image;
    }
}