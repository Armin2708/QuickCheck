package com.quickcheck.chatMessage;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record MessageRegistrationRequest(
        Integer userId,
        String content,
        LocalDateTime sentDateTime,
        Integer chatId
) {
}
