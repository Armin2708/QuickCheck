package com.quickcheck.admin;

import com.quickcheck.Gender;

import java.math.BigInteger;
import java.util.List;

public class Admin {
    private BigInteger id;
    private String schoolName;
    private String name;
    private String address;
    private String email;
    private String password;
    private String dateOfBirth;
    private Gender gender;
    private List<Integer> classesId;

    public Admin() {
    }

    public Admin(String schoolName, String name, String address, String email, String password, String dateOfBirth, Gender gender, List<Integer> classesId) {
        this.schoolName = schoolName;
        this.name = name;
        this.address = address;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.classesId = classesId;
    }

    public BigInteger getId() {
        return id;
    }

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

    public void setClassesId(List<Integer> classesId) {
        this.classesId = classesId;
    }
}
