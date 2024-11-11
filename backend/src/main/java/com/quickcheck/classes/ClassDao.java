package com.quickcheck.classes;

import com.quickcheck.classroom.Classroom;

import java.util.List;
import java.util.Optional;

public interface ClassDao {
    List<Class> selectAllClasses();

    List<Class> selectClassesOfUserInOrganization(Integer userId, Integer orgId);
    List<Class> selectClassesOfOrganization(Integer orgId);
    List<Class> selectClassesOfProfessorInOrganization(Integer professorId ,Integer orgId);

    Optional<Class> selectClassById(Integer id);

    void joinClass(Integer classId, Integer userId);
    void leaveClass(Integer classId, Integer userId);

    boolean existClassById(Integer id);
    boolean existClassesOfUser(Integer userId);
    boolean existClassesInOrganization(Integer orgId);
    boolean existUserInClass(Integer classId, Integer userId);


    void insertClass(Class aClass);
    void updateClass(Class update);
    void deleteClassById(Integer id);
}