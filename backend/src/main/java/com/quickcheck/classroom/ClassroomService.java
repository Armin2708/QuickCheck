package com.quickcheck.classroom;

import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomService {

    private final ClassroomDao classroomDao;

    public ClassroomService(ClassroomDao classroomDao) {
        this.classroomDao = classroomDao;
    }

    public List<Classroom> getAllClassrooms() {
        return classroomDao.selectAllClassrooms();
    }

    public Classroom getClassroomById(Integer classroomId) {
        return classroomDao.selectClassroomById(classroomId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Classroom with id [%s] not found".formatted(classroomId)
                ));
    }

    public Classroom getClassroomByName(String roomName) {
        return classroomDao.selectClassroomByName(roomName)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Classroom with id [%s] not found".formatted(roomName)
                ));
    }

    public void addClassroom(ClassroomRegistrationRequest request) {
        String name = request.roomName();
        if (classroomDao.existClassroomByName(name)) {
            throw new DuplicateResourceException("Classroom with name [%s] already exists".formatted(name));
        }
        Classroom classroom = new Classroom(
                request.roomName(),
                request.location(),
                request.capacity()
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
        if (classroomUpdateRequest.roomName() != null && !classroomUpdateRequest.roomName().equals(classroom.getRoomName())) {
            if (classroomDao.existClassroomByName(classroomUpdateRequest.roomName())) {
                throw new DuplicateResourceException("Classroom name already taken");
            }
            classroom.setRoomName(classroomUpdateRequest.roomName());
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