package com.quickcheck.classroom;

import java.util.List;
import java.util.Optional;

public interface ClassroomDao {

    List<Classroom> selectAllClassrooms();
    List<Classroom> selectAllOrganizationClassrooms(Integer organizationId);
    List<Classroom> selectOrganizationClassroomsByNameSearch(Integer organizationId, String classroomName);


    Optional<Classroom> selectClassroomById(Integer id);
    Optional<Classroom> selectClassroomByNameAndOrganization(String name, Integer organizationId);
    Optional<Classroom> selectClassroomByName(String roomName);

    void insertClassroom(Classroom classroom);

    boolean existClassroomById(Integer id);
    boolean existClassroomByNameAndOrganizationId(String name, Integer organizationId);

    void updateClassroom(Classroom update);
    void deleteClassroomById(Integer id);

}