package com.quickcheck.classroom;


import java.util.List;
import java.util.Objects;

public class Classroom {

    private Integer id;
    private String name;
    private Integer professorId;
    private String location;
    private String startDate;
    private String endDate;
    private List<String> classDays;
    private List<Integer> studentsId;
    private List<Integer> adminsId;

    public Classroom() {
    }

    public Classroom(Integer id, String name, Integer professorId, String location,
                     String startDate, String endDate, List<String> classDays, List<Integer> studentsId,
                     List<Integer> adminsId) {
        this.id = id;
        this.name = name;
        this.professorId = professorId;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.classDays = classDays;
        this.studentsId=studentsId;
        this.adminsId=adminsId;
    }

    public Classroom(String name, Integer professorId, String location, String startDate,
                     String endDate, List<String> classDays, List<Integer> studentsId,
                     List<Integer> adminsId) {
        this.name = name;
        this.professorId = professorId;
        this.location = location;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Integer professorId) {
        this.professorId = professorId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Classroom classroom = (Classroom) o;
        return Objects.equals(id, classroom.id) &&
                Objects.equals(name, classroom.name) &&
                Objects.equals(professorId, classroom.professorId) &&
                Objects.equals(location, classroom.location) &&
                Objects.equals(startDate, classroom.startDate) &&
                Objects.equals(endDate, classroom.endDate) &&
                Objects.equals(classDays, classroom.classDays) &&
                Objects.equals(studentsId, classroom.studentsId)&&
                Objects.equals(adminsId, classroom.adminsId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, professorId, location, startDate, endDate, classDays, studentsId, adminsId);
    }

    @Override
    public String toString() {

        return "admin{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", professorId='" + professorId + '\'' +
                ", location='" + location + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", classDays=" + classDays + '\'' +
                ", studentsId=" + studentsId +
                ", adminsId='" + adminsId + '\'' +
                '}';
    }
}
