package com.quickcheck.classroom;

import java.util.List;

public class Classroom {

    private Integer id;
    private String className;
    private Integer professorId;
    private String classLocation;
    private String startDate;
    private String endDate;
    private List<String> classDays;
    private List<Integer> studentsId;
    private List<Integer> adminsId;

    public Classroom() {
    }

    public Classroom(Integer id, String className, Integer professorId, String classLocation,
                     String startDate, String endDate, List<String> classDays, List<Integer> studentsId,
                     List<Integer> adminsId) {
        this.id = id;
        this.className = className;
        this.professorId = professorId;
        this.classLocation = classLocation;
        this.startDate = startDate;
        this.endDate = endDate;
        this.classDays = classDays;
        this.studentsId=studentsId;
        this.adminsId=adminsId;
    }

    public Classroom(String className, Integer professorId, String classLocation, String startDate,
                     String endDate, List<String> classDays, List<Integer> studentsId,
                     List<Integer> adminsId) {
        this.className = className;
        this.professorId = professorId;
        this.classLocation = classLocation;
        this.startDate = startDate;
        this.endDate = endDate;
        this.classDays = classDays;
        this.studentsId = studentsId;
        this.adminsId = adminsId;
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

    public Integer getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Integer professorId) {
        this.professorId = professorId;
    }

    public String getClassLocation() {
        return classLocation;
    }

    public void setClassLocation(String classLocation) {
        this.classLocation = classLocation;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public List<String> getClassDays() {
        return classDays;
    }

    public void setClassDays(List<String> classDays) {
        this.classDays = classDays;
    }

    public List<Integer> getStudentsId() {
        return studentsId;
    }

    public void setStudentsId(List<Integer> studentsId) {
        this.studentsId = studentsId;
    }

    public List<Integer> getAdminsId() {
        return adminsId;
    }

    public void setAdminsId(List<Integer> adminsId) {
        this.adminsId = adminsId;
    }
}
