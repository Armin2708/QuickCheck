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
                request.professorId(),
                request.classLocation(),
                request.startDate(),
                request.endDate(),
                request.classDays(),
                request.studentsId(),
                request.adminsId()
        );
        classroomDao.insertClassroom(classroom);
    }

    public void updateClassroom(Integer classroomId, ClassroomUpdateRequest classroomUpdateRequest) {
        Classroom classroom = classroomDao.selectClassroomById(classroomId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Classroom with id [%s] not found".formatted(classroomId)
                ));
        boolean changes = false;

        // Check and update className
        if (classroomUpdateRequest.className() != null && !classroomUpdateRequest.className().equals(classroom.getClassName())) {
            if (classroomDao.existClassroomByName(classroomUpdateRequest.className())) {
                throw new DuplicateResourceException("Classroom name already taken");
            }
            classroom.setClassName(classroomUpdateRequest.className());
            changes = true;
        }

        // Check and update professorId
        if (classroomUpdateRequest.professorId() != null && !classroomUpdateRequest.professorId().equals(classroom.getProfessorId())) {
            classroom.setProfessorId(classroomUpdateRequest.professorId());
            changes = true;
        }

        // Check and update classLocation
        if (classroomUpdateRequest.classLocation() != null && !classroomUpdateRequest.classLocation().equals(classroom.getClassLocation())) {
            classroom.setClassLocation(classroomUpdateRequest.classLocation());
            changes = true;
        }

        // Check and update startDate
        if (classroomUpdateRequest.startDate() != null && !classroomUpdateRequest.startDate().equals(classroom.getStartDate())) {
            classroom.setStartDate(classroomUpdateRequest.startDate());
            changes = true;
        }

        // Check and update endDate
        if (classroomUpdateRequest.endDate() != null && !classroomUpdateRequest.endDate().equals(classroom.getEndDate())) {
            classroom.setEndDate(classroomUpdateRequest.endDate());
            changes = true;
        }

        // Check and update classDays
        if (classroomUpdateRequest.classDays() != null && !classroomUpdateRequest.classDays().equals(classroom.getClassDays())) {
            classroom.setClassDays(classroomUpdateRequest.classDays());
            changes = true;
        }

        // Check and update studentsId
        if (classroomUpdateRequest.studentsId() != null && !classroomUpdateRequest.studentsId().equals(classroom.getStudentsId())) {
            classroom.setStudentsId(classroomUpdateRequest.studentsId());
            changes = true;
        }

        // Check and update adminsId
        if (classroomUpdateRequest.adminsId() != null && !classroomUpdateRequest.adminsId().equals(classroom.getAdminsId())) {
            classroom.setAdminsId(classroomUpdateRequest.adminsId());
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