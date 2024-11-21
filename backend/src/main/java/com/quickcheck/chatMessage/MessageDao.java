package com.quickcheck.chatMessage;

import java.util.List;

public interface MessageDao {
    List<Message> selectAllMessagesFromChat(Integer chatId);

    Integer insertMessage(Message message);

    void deleteMessage(Integer messageId);

    boolean existMessageById(Integer messageId);
}
