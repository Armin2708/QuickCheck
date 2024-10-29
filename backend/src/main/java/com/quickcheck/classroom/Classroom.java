package com.quickcheck.classroom;

import java.util.Objects;

public class Classroom {

    private Integer id;
    private String roomName;
    private String location;
    private Integer capacity;

    public Classroom() {
    }

    public Classroom(String roomName, String location, Integer capacity) {
        this.roomName = roomName;
        this.location = location;
        this.capacity = capacity;
    }

    public Classroom(Integer id, String roomName, String location, Integer capacity) {
        this.id = id;
        this.roomName = roomName;
        this.location = location;
        this.capacity = capacity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Classroom classroom = (Classroom) o;
        return Objects.equals(id, classroom.id) &&
                Objects.equals(roomName, classroom.roomName) &&
                Objects.equals(location, classroom.location) &&
                Objects.equals(capacity, classroom.capacity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, roomName, location, capacity);
    }

    @Override
    public String toString() {

        return "classroom{" +
                "id=" + id +
                ", roomName='" + roomName + '\'' +
                ", location='" + location + '\'' +
                ", capacity='" + capacity + '\'' +
                '}';
    }
}
