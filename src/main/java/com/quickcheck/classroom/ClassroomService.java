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

    public Classroom getClassroom(Integer classroomId) {
        return classroomDao.selectClassroomById(classroomId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Classroom with id [%s] not found".formatted(classroomId)
                ));
    }

    public void addClassroom(ClassroomRegistrationRequest request) {
        String className = request.className();
        if (classroomDao.existClassroomByName(className)) {
            throw new DuplicateResourceException("Class name already exists");
        }
        Classroom classroom = new Classroom(
                request.className(),
                request.professorName(),
                request.adminsId(),
                request.studentsId(),
                request.attendanceOfStudents(),
                request.attendanceRecord(),
                request.classLocation()
        );
        classroomDao.insertClassroom(classroom);
    }

    // Assuming ClassroomUpdateRequest is a similar record with ClassroomRegistrationRequest
    public void updateClassroom(Integer classroomId, ClassroomUpdateRequest classroomUpdateRequest) {
        Classroom classroom = classroomDao.selectClassroomById(classroomId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Classroom with id [%s] not found".formatted(classroomId)
                ));
        boolean changes = false;

        // Only implemented for some fields. Add more fields as needed.
        if (classroomUpdateRequest.className() != null && !classroomUpdateRequest.className().equals(classroom.getClassName())) {
            if (classroomDao.existClassroomByName(classroomUpdateRequest.className())) {
                throw new DuplicateResourceException("Classroom name already taken");
            }
            classroom.setClassName(classroomUpdateRequest.className());
            changes = true;
        }

        if (classroomUpdateRequest.professorName() != null && !classroomUpdateRequest.professorName().equals(classroom.getProfessorName())) {
            classroom.setProfessorName(classroomUpdateRequest.professorName());
            changes = true;
        }

        // Implement rest of the updates here...

        if (!changes) {
            throw new RequestValidationException("No data changes found");
        }

        classroomDao.updateClassroom(classroom);
    }

    public void deleteClassroom(Integer classroomId) {
        if (!classroomDao.existClassroomById(classroomId)){
            throw new ResourceNotFoundException("Classroom with id [%s] not found".formatted(classroomId));
        }
        classroomDao.deleteClassroomById(classroomId);
    }
}