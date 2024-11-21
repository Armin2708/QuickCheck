package com.quickcheck.chat;

import com.quickcheck.user.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/chats")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }


    @GetMapping
    public List<Chat> getChats(){
        return chatService.getAllChats();
    }

    @GetMapping("/class/{classId}")
    public List<Chat> getClassChats(@PathVariable("classId") Integer classId){
        return chatService.getClassChats(classId);
    }

    @GetMapping("/class/{classId}/user/{userId}")
    public List<Chat> getClassChatsUserJoined(
            @PathVariable("classId") Integer classId,
            @PathVariable("userId") Integer userId){
        return chatService.getClassChatsJoined(classId,userId);
    }

    @GetMapping("/{chatId}")
    public Optional<Chat> getChat(@PathVariable("chatId") Integer chatId){
        return chatService.getChatById(chatId);
    }

    @PostMapping
    public ResponseEntity<?> registerChat(
            @RequestBody ChatRegistrationRequest registrationRequest
    ) {
        chatService.addChat(registrationRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/join/{chatId}/{userId}")
    public ResponseEntity<?> joinChat(
            @PathVariable("chatId") Integer chatId,
            @PathVariable("userId") Integer userId
    ) {
        chatService.joinChat(chatId,userId);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/leave/{chatId}/{userId}")
    public ResponseEntity<?> leaveClass(
            @PathVariable("chatId") Integer chatId,
            @PathVariable("userId") Integer userId
    ) {
        chatService.leaveChat(chatId,userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{chatId}")
    public void updateChat(
            @PathVariable("chatId") Integer chatId,
            @RequestBody ChatUpdateRequest updateRequest){
        chatService.updateChat(chatId,updateRequest);
    }

    @DeleteMapping("{chatId}")
    public void deleteChat(
            @PathVariable("chatId") Integer chatId
    ){
        chatService.deleteChat(chatId);
    }

}
