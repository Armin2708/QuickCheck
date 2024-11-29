package com.quickcheck.email;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

        private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
        public ResponseEntity<String> sendEmail(
                @RequestBody EmailRequest emailRequest
    ){
            return  ResponseEntity.ok(emailService.sendEmail(emailRequest,"Link"));
    }

    @PostMapping("/verify")
    public void verifyEmail(
            @RequestBody EmailCodeCreationRequest request
    ){
            emailService.verifyEmail(request);
    }

    @PostMapping("/verify/code")
    public EmailCodeVerificationResponse verifyGivenCode(
            @RequestBody EmailVerificationRequest emailRequest
    ){
            return  emailService.verifyEmailGivenCode(emailRequest);
    }

    @PostMapping("/reset-password")
        public void resetPassword(
            @RequestBody EmailCodeCreationRequest request
    ){
            emailService.passwordResetEmail(request);
    }

        @PostMapping("/reset-password/code")
        public EmailCodeVerificationResponse resetPassword(
                @RequestBody EmailVerificationRequest emailRequest
        ){
                return emailService.passwordResetEmailGivenCode(emailRequest);
        }



}
