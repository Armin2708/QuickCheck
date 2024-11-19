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
    private String imageId;

    public Class() {
    }

    public Class(String name, Integer professorId, Date startDate, Date endDate, Integer classroomId, Integer organizationId) {
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

    public Class(Integer id, String name, Integer professorId, Date startDate,
                 Date endDate, Integer classroomId,Integer organizationId, String imageId) {
        this(id,name,professorId,startDate,endDate,classroomId,organizationId);
        this.imageId=imageId;
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

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Class aClass)) return false;
        return Objects.equals(id, aClass.id) &&
                Objects.equals(name, aClass.name) &&
                Objects.equals(professorId, aClass.professorId) &&
                Objects.equals(startDate, aClass.startDate) &&
                Objects.equals(endDate, aClass.endDate) &&
                Objects.equals(classroomId, aClass.classroomId) &&
                Objects.equals(organizationId, aClass.organizationId) &&
                Objects.equals(imageId, aClass.imageId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, professorId, startDate, endDate, classroomId, organizationId, imageId);
    }

    @Override
    public String toString() {
        return "Class{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", professorId=" + professorId +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", classroomId=" + classroomId +
                ", organizationId=" + organizationId +
                ", imageId='" + imageId + '\'' +
                '}';
    }
}
