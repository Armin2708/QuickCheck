package com.quickcheck.user;

import com.quickcheck.Gender;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class User {
    private Integer id;
    private String schoolName;
    private String name;
    private String address;
    private String email;
    private String password;
    private String dateOfBirth;
    private Gender gender;
    private List<Integer> classesId;

    public User() {
    }

    public User(String schoolName, String name, String address, String email, String password, String dateOfBirth, Gender gender, List<Integer> classesId) {
        this.schoolName = schoolName;
        this.name = name;
        this.address = address;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.classesId = classesId;
    }

    public User(Integer id, String schoolName, String name, String address, String email, String password, String dateOfBirth, Gender gender, List<Integer> classesId) {
        this.id = id;
        this.schoolName = schoolName;
        this.name = name;
        this.address = address;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.classesId = classesId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id){this.id=id;}

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public List<Integer> getClassesId() {
        return classesId;
    }

    public void setClassesId(List<Integer> classId) {
        this.classesId = classId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &&
                Objects.equals(schoolName, user.schoolName) &&
                Objects.equals(name, user.name) &&
                Objects.equals(address, user.address) &&
                Objects.equals(email, user.email) &&
                Objects.equals(password, user.password) &&
                Objects.equals(dateOfBirth, user.dateOfBirth) &&
                Objects.equals(gender, user.gender)&&
                Objects.equals(classesId, user.classesId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, schoolName, name, address, email, password, dateOfBirth, gender, classesId);
    }

    @Override
    public String toString() {

        return "User{" +
                "id=" + id +
                ", schoolName='" + schoolName + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", dateOfBirth=" + dateOfBirth + '\'' +
                ", gender=" + gender +
                ", classesId='" + classesId + '\'' +
                '}';
    }

}
