package com.quickcheck.classroom;

import java.util.Objects;

public class Classroom {

    private Integer id;
    private String name;
    private String location;
    private Integer capacity;
    private Integer organizationId;


    public Classroom() {
    }

    public Classroom(String name, String location, Integer capacity, Integer organizationId) {
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.organizationId = organizationId;
    }

    public Classroom(Integer id, String name, String location, Integer capacity, Integer organizationId) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
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
        if (!(o instanceof Classroom classroom)) return false;
        return Objects.equals(id, classroom.id) && Objects.equals(name, classroom.name) && Objects.equals(location, classroom.location) && Objects.equals(capacity, classroom.capacity) && Objects.equals(organizationId, classroom.organizationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, location, capacity, organizationId);
    }

    @Override
    public String toString() {
        return "Classroom{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", capacity=" + capacity +
                ", organizationId=" + organizationId +
                '}';
    }
}
