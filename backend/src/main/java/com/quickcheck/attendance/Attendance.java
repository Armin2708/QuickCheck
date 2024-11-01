package com.quickcheck.attendance;

import com.quickcheck.email.EmailCodeObject;

import java.time.LocalDate;
import java.util.Objects;

public class Attendance {
    private Integer id;
    private String tag;
    private LocalDate date;
    private Integer professorId;
    private Integer classId;
    private Integer code;
    private Boolean openStatus;
    private Integer radius;

    public Attendance(){}

    public Attendance(String tag,LocalDate date, Integer professorId, Integer classId, Integer code, Boolean openStatus,Integer radius) {
        this.tag = tag;
        this.date = date;
        this.professorId = professorId;
        this.classId = classId;
        this.code = code;
        this.openStatus = openStatus;
        this.radius=radius;
    }

    public Attendance(Integer id,String tag, LocalDate date, Integer professorId, Integer classId, Integer code, Boolean openStatus,Integer radius) {
        this.id = id;
        this.tag=tag;
        this.date = date;
        this.professorId = professorId;
        this.classId = classId;
        this.code = code;
        this.openStatus = openStatus;
        this.radius=radius;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Integer professorId) {
        this.professorId = professorId;
    }

    public Integer getClassId() {
        return classId;
    }

    public void setClassId(Integer classId) {
        this.classId = classId;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Boolean isOpenStatus() {
        return openStatus;
    }

    public void setOpenStatus(Boolean openStatus) {
        this.openStatus = openStatus;
    }

    public Integer getRadius() {
        return radius;
    }

    public void setRadius(Integer radius) {
        this.radius = radius;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Attendance attendance = (Attendance) o;
        return Objects.equals(id,attendance.id) &&
                Objects.equals(tag,attendance.tag) &&
                Objects.equals(date,attendance.date) &&
                Objects.equals(professorId,attendance.professorId) &&
                Objects.equals(classId,attendance.classId) &&
                Objects.equals(code,attendance.code) &&
                Objects.equals(openStatus,attendance.openStatus) &&
                Objects.equals(radius,attendance.radius);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, tag,date, professorId,classId ,code,openStatus,radius);
    }

    @Override
    public String toString() {

        return "User{" +
                "id=" + id +
                ", tag='" + tag + '\'' +
                ", date='" + date + '\'' +
                ", professorId='" + professorId + '\'' +
                ", classId='" + classId + '\'' +
                ", code='" + code + '\'' +
                ", openStatus='" + openStatus + '\'' +
                ", radius='" + radius + '\'' +
                '}';
    }
}
