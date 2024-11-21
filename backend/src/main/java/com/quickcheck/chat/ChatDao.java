package com.quickcheck.chat;

import com.quickcheck.user.User;

import java.util.List;
import java.util.Optional;

public interface ChatDao {

    List<Chat> selectAllChats();
    List<Chat> selectClassChats(Integer classId);
    List<Chat> selectClassChatsJoined(Integer classId, Integer userId);

    Optional<Chat> selectChatById(Integer chatId);

    boolean existChatById(Integer chatId);

    void insertChat(Chat chat);

    void updateChat(Chat update);

    void deleteChat(Integer chatId);

    void joinChat(Integer chatId, Integer userId);

    void leaveChat(Integer chatId, Integer userId);

    boolean existUserInChat(Integer chatId, Integer userId);
}
