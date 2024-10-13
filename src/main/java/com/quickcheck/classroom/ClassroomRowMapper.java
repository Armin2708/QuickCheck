package com.quickcheck.classroom;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

@Component
public class ClassroomRowMapper implements RowMapper<Classroom> {
    @Override
    public Classroom mapRow(ResultSet rs, int rowNum) throws SQLException {
        Classroom classroom = new Classroom();
        classroom.setId(rs.getInt("id"));
        classroom.setClassName(rs.getString("classname"));
        classroom.setProfessorName(rs.getString("professorname"));

        // assumes the adminsId and studentsId are stored as arrays of integers in the database
        Integer[] adminsIdArray = (Integer[])rs.getArray("adminsid").getArray();
        Integer[] studentsIdArray = (Integer[])rs.getArray("studentsid").getArray();
        classroom.setAdminsId(Arrays.asList(adminsIdArray));
        classroom.setStudentsId(Arrays.asList(studentsIdArray));

        // assuming attendanceOfStudents and attendanceRecord are stored as serialized arrays
        String[] attendanceOfStudentsArray = (String[])rs.getArray("attendanceofstudents").getArray();
        Object[] attendanceRecordArray = (Object[])rs.getArray("attendancerecord").getArray();
        classroom.setAttendanceOfStudents(Arrays.asList(attendanceOfStudentsArray));
        // assuming you have a method that converts array of objects to List of List of Strings
        classroom.setAttendanceRecord(attendanceRecordObjectsToListListString(attendanceRecordArray));

        classroom.setClassLocation(rs.getString("classlocation"));

        return classroom;
    }

    private List<List<String>> attendanceRecordObjectsToListListString(Object[] attendanceRecordArray) {
        // implement converting array of objects to List of List of Strings
        return List.of(); // replace with your actual implementation
    }
}