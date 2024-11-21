package com.quickcheck.chat;

import com.quickcheck.classes.ClassDao;
import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.RequestValidationException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.user.UserDTO;
import com.quickcheck.user.UserDTOMapper;
import com.quickcheck.user.UserDao;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatDao chatDao;
    private final ClassDao classDao;
    private final UserDao userDao;

    public ChatService(ChatDao chatDao, ClassDao classDao, UserDao userDao, UserDTOMapper userDTOMapper) {
        this.chatDao = chatDao;
        this.classDao = classDao;
        this.userDao = userDao;
    }

    private void checkIfClassExists(Integer classId){
        if (!classDao.existClassById(classId)){
            throw new ResourceNotFoundException("No class found with id %s".formatted(classId));
        }
    }

    private void checkIfUserExists(Integer userId){
        if (!userDao.existUserById(userId)){
            throw new ResourceNotFoundException("No User found with id %s".formatted(userId));
        }
    }

    private void checkIfChatExists(Integer chatId){
        if (!chatDao.existChatById(chatId)){
            throw new ResourceNotFoundException("No Chat found with id %s".formatted(chatId));
        }
    }

    private void checkIfUserInChat(Integer chatId, Integer userId){
        if (chatDao.existUserInChat(chatId,userId)){
            throw new DuplicateResourceException("User with id %s is already in chat with id %s".formatted(userId,chatId));
        }
    }

    private void checkIfUserNotInChat(Integer chatId, Integer userId){
        if (!chatDao.existUserInChat(chatId,userId)){
            throw new ResourceNotFoundException("User with id %s is not in chat with id %s".formatted(userId,chatId));
        }
    }

    public List<Chat> getAllChats(){
        return chatDao.selectAllChats();
    }

    public List<Chat> getClassChats(Integer classId){

        checkIfClassExists(classId);
        return chatDao.selectClassChats(classId);
    }

    public List<Chat> getClassChatsJoined(Integer classId, Integer userId){

        checkIfClassExists(classId);
        checkIfUserExists(userId);
        return chatDao.selectClassChatsJoined(classId, userId);
    }

    public Optional<Chat> getChatById(Integer chatId){

        checkIfChatExists(chatId);
        return chatDao.selectChatById(chatId);
    }

    public void addChat(ChatRegistrationRequest request){

        checkIfClassExists(request.classId());

        Chat chat = new Chat(
                request.name(),
                request.classId()
        );

        chatDao.insertChat(chat);
    }

    public void joinChat(Integer chatId, Integer userId){

        checkIfChatExists(chatId);
        checkIfUserExists(userId);
        checkIfUserInChat(chatId,userId);
        chatDao.joinChat(chatId, userId);
    }

    public void leaveChat(Integer chatId, Integer userId){

        checkIfChatExists(chatId);
        checkIfUserExists(userId);
        checkIfUserNotInChat(chatId,userId);
        chatDao.leaveChat(chatId, userId);
    }

    public void updateChat(Integer chatId, ChatUpdateRequest update){
        checkIfChatExists(chatId);

        Chat chat = chatDao.selectChatById(chatId).get();

        boolean changes = false;

        // Check and update name
        if (update.name() != null && !update.name().equals(chat.getName())) {
            chat.setName(update.name());
            changes = true;
        }

        // If no changes were made, throw an exception
        if (!changes) {
            throw new RequestValidationException("No data changes found");
        }

        chatDao.updateChat(chat);
    }

    public void deleteChat(Integer chatId){
        checkIfChatExists(chatId);

        chatDao.deleteChat(chatId);
    }


}
