package com.quickcheck.classroom;

import java.util.List;
import java.util.Optional;

public interface ClassroomDao {
    List<Classroom> selectAllClassrooms();
    Optional<Classroom> selectClassroomById(Integer id);
    void insertClassroom(Classroom classroom);
    boolean existClassroomByName(String className);
    void deleteClassroomById(Integer id);
    boolean existClassroomById(Integer id);
    void updateClassroom(Classroom update);
    Optional<Classroom> selectClassroomByName(String className);
}