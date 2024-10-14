package com.quickcheck.classroom;

import org.springframework.data.relational.core.sql.In;

import java.math.BigInteger;
import java.util.List;

public class Classroom {

    private Integer id;
    private String className;
    private String professorName;
    private List<Integer> adminsId;
    private List <Integer> studentsId;
    private List<String> attendanceOfStudents;
    private List<List<String>> attendanceRecord;
    private String classLocation;

    //private Class schedule;
    //private Class Chat;


    public Classroom() {
    }

    public Classroom(String className, String professorName, List<Integer> adminsId, List<Integer> studentsId, List<String> attendanceOfStudents, List<List<String>> attendanceRecord, String classLocation) {
        this.className = className;
        this.professorName = professorName;
        this.adminsId = adminsId;
        this.studentsId = studentsId;
        this.attendanceOfStudents = attendanceOfStudents;
        this.attendanceRecord = attendanceRecord;
        this.classLocation = classLocation;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getProfessorName() {
        return professorName;
    }

    public void setProfessorName(String professorName) {
        this.professorName = professorName;
    }

    public List<Integer> getAdminsId() {
        return adminsId;
    }

    public void setAdminsId(List<Integer> adminsId) {
        this.adminsId = adminsId;
    }

    public List<Integer> getStudentsId() {
        return studentsId;
    }

    public void setStudentsId(List<Integer> studentsId) {
        this.studentsId = studentsId;
    }

    public List<String> getAttendanceOfStudents() {
        return attendanceOfStudents;
    }

    public void setAttendanceOfStudents(List<String> attendanceOfStudents) {
        this.attendanceOfStudents = attendanceOfStudents;
    }

    public List<List<String>> getAttendanceRecord() {
        return attendanceRecord;
    }

    public void setAttendanceRecord(List<List<String>> attendanceRecord) {
        this.attendanceRecord = attendanceRecord;
    }

    public String getClassLocation() {
        return classLocation;
    }

    public void setClassLocation(String classLocation) {
        this.classLocation = classLocation;
    }
}
