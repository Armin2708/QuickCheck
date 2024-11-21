package com.quickcheck.chatMessage;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/chat/{chatId}")
    public List<Message> getChatMessages(@PathVariable("chatId") Integer chatId){
        return messageService.getAllChatMessages(chatId);
    }


    @PostMapping
    public ResponseEntity<?> registerMessage(
            @RequestBody MessageRegistrationRequest registrationRequest
    ) {
        messageService.addMessage(registrationRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{messageId}")
    public void deleteMessage(
            @PathVariable("messageId") Integer messageId
    ){
        messageService.deleteMessage(messageId);
    }
}
