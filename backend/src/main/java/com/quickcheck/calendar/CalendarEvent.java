package com.quickcheck.calendar;

import java.time.ZonedDateTime;
import java.util.Objects;

public class CalendarEvent {

    private Integer id;
    private String title;
    private String description;
    private ZonedDateTime start;
    private ZonedDateTime end;
    private Integer creatorId;
    private Integer classId;

    public CalendarEvent(String title, String description, ZonedDateTime start, ZonedDateTime end, Integer creatorId, Integer classId) {
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.creatorId = creatorId;
        this.classId = classId;
    }

    public CalendarEvent(Integer id, String title, String description, ZonedDateTime start, ZonedDateTime end, Integer creatorId, Integer classId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.creatorId = creatorId;
        this.classId = classId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getStart() {
        return start;
    }

    public void setStart(ZonedDateTime start) {
        this.start = start;
    }

    public ZonedDateTime getEnd() {
        return end;
    }

    public void setEnd(ZonedDateTime end) {
        this.end = end;
    }

    public Integer getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Integer creatorId) {
        this.creatorId = creatorId;
    }

    public Integer getClassId() {
        return classId;
    }

    public void setClassId(Integer classId) {
        this.classId = classId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CalendarEvent event)) return false;
        return Objects.equals(id, event.id) && Objects.equals(title, event.title) && Objects.equals(description, event.description) && Objects.equals(start, event.start) && Objects.equals(end, event.end) && Objects.equals(creatorId, event.creatorId) && Objects.equals(classId, event.classId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, start, end, creatorId, classId);
    }

    @Override
    public String toString() {
        return "Calendar{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", start=" + start +
                ", end=" + end +
                ", creatorId=" + creatorId +
                ", classId=" + classId +
                '}';
    }
}
