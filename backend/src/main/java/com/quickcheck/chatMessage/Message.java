package com.quickcheck.chatMessage;

import java.time.LocalDate;
import java.util.Objects;

public class Message {

    private Integer id;
    private Integer userId;
    private String content;
    private LocalDate dateTime;
    private Integer chatId;

    public Message(Integer id, Integer userId, String content, LocalDate dateTime, Integer chatId) {
        this.id = id;
        this.userId = userId;
        this.content = content;
        this.dateTime = dateTime;
        this.chatId = chatId;
    }

    public Message(Integer userId, String content, LocalDate dateTime, Integer chatId) {
        this.userId = userId;
        this.content = content;
        this.dateTime = dateTime;
        this.chatId = chatId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDate dateTime) {
        this.dateTime = dateTime;
    }

    public Integer getChatId() {
        return chatId;
    }

    public void setChatId(Integer chatId) {
        this.chatId = chatId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Message message)) return false;
        return Objects.equals(id, message.id) && Objects.equals(userId, message.userId) && Objects.equals(content, message.content) && Objects.equals(dateTime, message.dateTime) && Objects.equals(chatId, message.chatId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, content, dateTime, chatId);
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", userId=" + userId +
                ", content='" + content + '\'' +
                ", dateTime=" + dateTime +
                ", chatId=" + chatId +
                '}';
    }
}
