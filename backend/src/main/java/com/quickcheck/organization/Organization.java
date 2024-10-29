package com.quickcheck.organization;

import java.util.Objects;

public class Organization {

    private Integer id;
    private String name;

    public Organization(){}

    public Organization(String name) {
        this.name = name;
    }

    public Organization(Integer id, String name) {
        this.id = id;
        this.name = name;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Organization organization = (Organization) o;
        return Objects.equals(id, organization.id) &&
                Objects.equals(name, organization.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {

        return "admin{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
