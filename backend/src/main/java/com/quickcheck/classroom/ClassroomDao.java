package com.quickcheck.classroom;

import java.util.List;
import java.util.Optional;

public interface ClassroomDao {

    List<Classroom> selectAllClassrooms();

    Optional<Classroom> selectClassroomById(Integer id);
    Optional<Classroom> selectClassroomByName(String roomName);

    void insertClassroom(Classroom classroom);

    boolean existClassroomById(Integer id);
    boolean existClassroomByName(String roomName);

    void updateClassroom(Classroom update);
    void deleteClassroomById(Integer id);

}