package com.quickcheck.chat;

import java.util.Objects;

public class Chat {
    private Integer id;
    private String name;
    private Integer classId;

    public Chat(Integer id, String name, Integer classId) {
        this.id = id;
        this.name = name;
        this.classId = classId;
    }

    public Chat(String name, Integer classId) {
        this.name = name;
        this.classId = classId;
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

    public Integer getClassId() {
        return classId;
    }

    public void setClassId(Integer classId) {
        this.classId = classId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Chat chat)) return false;
        return Objects.equals(id, chat.id) && Objects.equals(name, chat.name) && Objects.equals(classId, chat.classId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, classId);
    }

    @Override
    public String toString() {
        return "Chat{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", classId=" + classId +
                '}';
    }
}
