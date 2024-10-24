package com.quickcheck.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

        @Autowired
        private EmailService emailService;

        @PostMapping("/send")
        public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest){
            return  ResponseEntity.ok(emailService.sendEmail(emailRequest));
        }

        @PostMapping("/verify")
        public void verifyEmail(@RequestParam String email){
                emailService.verifyEmail(email);
        }

        @PostMapping("/verify/code")
        public boolean verifyGivenCode(@RequestBody EmailVerificationRequest emailRequest){
                return  emailService.verifyGivenCode(emailRequest);
        }

}
