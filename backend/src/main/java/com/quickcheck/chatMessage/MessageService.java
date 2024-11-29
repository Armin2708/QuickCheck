package com.quickcheck.chatMessage;

import com.quickcheck.chat.ChatDao;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.user.UserDao;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageDao messageDao;
    private final ChatDao chatDao;
    private final UserDao userDao;
    private final SimpMessagingTemplate messagingTemplate;


    public MessageService(MessageDao messageDao, ChatDao chatDao, UserDao userDao, SimpMessagingTemplate messagingTemplate) {
        this.messageDao = messageDao;
        this.chatDao = chatDao;
        this.userDao = userDao;
        this.messagingTemplate = messagingTemplate;
    }

    private void checkIfChatExists(Integer chatId){
        if (!chatDao.existChatById(chatId)){
            throw new ResourceNotFoundException("No Chat found with id %s".formatted(chatId));
        }
    }

    private void checkIfMessageExists(Integer messageId){
        if (!messageDao.existMessageById(messageId)){
            throw new ResourceNotFoundException("No Message found with id %s".formatted(messageId));
        }
    }
    private void checkIfUserExists(Integer userId){
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("No User found with id %s".formatted(userId));
        }
    }

    private void checkIfUserInChat(Integer userId, Integer chatId){
        if (!userDao.existUserInChat(userId, chatId)){
            throw new ResourceNotFoundException("User with id %s is not in Chat with id %s".formatted(userId, chatId));
        }
    }

    public List<Message> getAllChatMessages(Integer chatId){
        checkIfChatExists(chatId);

        return messageDao.selectAllMessagesFromChat(chatId);
    }

    public void addMessage(MessageRegistrationRequest request){

        checkIfUserExists(request.userId());
        checkIfChatExists(request.chatId());
        checkIfUserInChat(request.userId(), request.chatId());

        Message message = new Message(
                request.userId(),
                request.content(),
                request.sentDateTime(),
                request.chatId()
        );
        Integer messageId = messageDao.insertMessage(message);


        // Send WebSocket notification to a dynamic channel based on the attendance tag
        String socketMessage = "{"
                + "\"id\": \"" + messageId + "\", "
                + "\"userId\": " + message.getUserId() + ", "
                + "\"content\": \"" + message.getContent()
                .replace("\"", "\\\"") // Escape quotes
                .replace("\n", "\\n") // Escape newline characters
                + "\", "
                + "\"dateTime\": \"" + message.getDateTime() + "\", "
                + "\"chatId\": \"" + message.getChatId() + "\""
                + "}";
        String destination = "/topic/message/chat/" + message.getChatId();
        messagingTemplate.convertAndSend(destination, socketMessage);
    }

    public void deleteMessage(Integer messageId){
        checkIfMessageExists(messageId);

        messageDao.deleteMessage(messageId);
    }
}
