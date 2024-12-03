package com.quickcheck.organizationEvent;

import java.time.LocalDateTime;
import java.util.Objects;

public class Event {

    private Integer id;
    private String name;
    private LocalDateTime dateTime;
    private String location;
    private Integer organizationId;
    private String description;

    public Event(String name, LocalDateTime dateTime, String location, Integer organizationId, String description) {
        this.name = name;
        this.dateTime = dateTime;
        this.location = location;
        this.organizationId = organizationId;
        this.description = description;
    }

    public Event(Integer id, String name, LocalDateTime dateTime, String location, Integer organizationId, String description) {
        this.id = id;
        this.name = name;
        this.dateTime = dateTime;
        this.location = location;
        this.organizationId = organizationId;
        this.description = description;
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

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Integer organizationId) {
        this.organizationId = organizationId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Event event)) return false;
        return Objects.equals(id, event.id) && Objects.equals(name, event.name) && Objects.equals(dateTime, event.dateTime) && Objects.equals(location, event.location) && Objects.equals(organizationId, event.organizationId) && Objects.equals(description, event.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, dateTime, location, organizationId, description);
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", dateTime=" + dateTime +
                ", location='" + location + '\'' +
                ", organizationId=" + organizationId +
                ", description='" + description + '\'' +
                '}';
    }
}
