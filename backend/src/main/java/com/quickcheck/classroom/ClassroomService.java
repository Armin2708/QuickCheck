package com.quickcheck.classroom;

import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.organization.OrganizationDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomService {

    private final ClassroomDao classroomDao;
    private final OrganizationDao organizationDao;

    public ClassroomService(ClassroomDao classroomDao, OrganizationDao organizationDao) {
        this.classroomDao = classroomDao;
        this.organizationDao = organizationDao;
    }

    private void checkIfOrganizationExists(Integer organizationId){
        if (!organizationDao.existOrganizationById(organizationId)){
            throw new ResourceNotFoundException("Organization with id [%s] not found".formatted(organizationId));
        }
    }

    private void checkIfClassroomDuplicateByNameAndOrganization(String name ,Integer organizationId){
        if (classroomDao.existClassroomByNameAndOrganizationId(name,organizationId)){
            throw new DuplicateResourceException("Classroom with name [%s] and organization id [%s] already exists".formatted(name, organizationId));
        }
    }



    public List<Classroom> getAllClassrooms() {
        return classroomDao.selectAllClassrooms();
    }

    public List<Classroom> getAllOrganizationClassrooms(Integer organizationId) {
        checkIfOrganizationExists(organizationId);
        return classroomDao.selectAllOrganizationClassrooms(organizationId);
    }

    public Classroom getClassroomById(Integer classroomId) {
        return classroomDao.selectClassroomById(classroomId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Classroom with id [%s] not found".formatted(classroomId)
                ));
    }

    public Classroom getClassroomByNameAndOrganization(String name, Integer organizationId) {
        return classroomDao.selectClassroomByNameAndOrganization(name,organizationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Classroom with name [%s] and organization id [%s] not found".formatted(name,organizationId)
                ));
    }

    public Classroom getClassroomByName(String roomName) {
        return classroomDao.selectClassroomByName(roomName)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Classroom with id [%s] not found".formatted(roomName)
                ));
    }

    public void addClassroom(ClassroomRegistrationRequest request) {
        checkIfOrganizationExists(request.organizationId());

        checkIfClassroomDuplicateByNameAndOrganization(request.roomName(), request.organizationId());

        Classroom classroom = new Classroom(
                request.roomName(),
                request.location(),
                request.capacity(),
                request.organizationId()
        );
        classroomDao.insertClassroom(classroom);
    }

    public void updateClassroom(Integer classroomId, ClassroomUpdateRequest classroomUpdateRequest) {

        Classroom classroom = classroomDao.selectClassroomById(classroomId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Classroom with id [%s] not found".formatted(classroomId)
                ));
        boolean changes = false;

        // Check and update name
        if (classroomUpdateRequest.roomName() != null && !classroomUpdateRequest.roomName().equals(classroom.getName())) {
            checkIfClassroomDuplicateByNameAndOrganization(classroomUpdateRequest.roomName(), classroom.getOrganizationId());
            classroom.setName(classroomUpdateRequest.roomName());
            changes = true;
        }

        // Check and update location
        if (classroomUpdateRequest.location() != null && !classroomUpdateRequest.location().equals(classroom.getLocation())) {
            classroom.setLocation(classroomUpdateRequest.location());
            changes = true;
        }

        // Check and update startDate
        if (classroomUpdateRequest.capacity() != null && !classroomUpdateRequest.capacity().equals(classroom.getCapacity())) {
            classroom.setCapacity(classroomUpdateRequest.capacity());
            changes = true;
        }

        // If no changes were made, throw an exception
        if (!changes) {
            throw new RequestValidationException("No data changes found");
        }

        // Update the classroom in the database
        classroomDao.updateClassroom(classroom);
    }

    public void deleteClassroom(Integer classroomId) {
        if (!classroomDao.existClassroomById(classroomId)){
            throw new ResourceNotFoundException("Classroom with id [%s] not found".formatted(classroomId));
        }
        classroomDao.deleteClassroomById(classroomId);
    }
}