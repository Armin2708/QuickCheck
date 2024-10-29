package com.quickcheck.classes;

import java.util.Date;
import java.util.Objects;

public class Class {

    private Integer id;
    private String name;
    private Integer professorId;
    private Date startDate;
    private Date endDate;
    private Integer classroomId;
    private Integer organizationId;

    public Class() {
    }

    public Class(String name, Integer professorId, Date startDate, Date endDate, Integer classroomId,Integer organizationId) {
        this.name = name;
        this.professorId = professorId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.classroomId = classroomId;
        this.organizationId = organizationId;
    }

    public Class(Integer id, String name, Integer professorId, Date startDate, Date endDate, Integer classroomId,Integer organizationId) {
        this.id = id;
        this.name = name;
        this.professorId = professorId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.classroomId = classroomId;
        this.organizationId = organizationId;
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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Integer getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(Integer classroomId) {
        this.classroomId = classroomId;
    }

    public Integer getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Integer organizationId) {
        this.organizationId = organizationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Class classObject = (Class) o;
        return Objects.equals(id, classObject.id) &&
                Objects.equals(name, classObject.name) &&
                Objects.equals(professorId, classObject.professorId) &&
                Objects.equals(startDate, classObject.startDate) &&
                Objects.equals(endDate, classObject.endDate) &&
                Objects.equals(classroomId, classObject.classroomId) &&
                Objects.equals(organizationId, classObject.organizationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, professorId, startDate,endDate,classroomId,organizationId);
    }

    @Override
    public String toString() {

        return "admin{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", professorId='" + professorId + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", classroomId='" + classroomId + '\'' +
                ", organizationId='" + organizationId + '\'' +
                '}';
    }
}
