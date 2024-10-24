package com.quickcheck.email;

import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.user.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;


@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final EmailDao emailDao;
    private final UserDao userDao;

    public EmailService(JavaMailSender javaMailSender, EmailDao emailDao, UserDao userDao) {
        this.javaMailSender = javaMailSender;
        this.emailDao = emailDao;
        this.userDao = userDao;
    }

    public String sendEmail(EmailRequest emailRequest){
        try{
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

            simpleMailMessage.setTo(emailRequest.to());
            simpleMailMessage.setSubject(emailRequest.subject());
            simpleMailMessage.setText(emailRequest.body());
            javaMailSender.send(simpleMailMessage); //where we are sending email

            return "Email successfully sent";
        }catch (Exception e){
            return e.getMessage();
        }
    }

    public void verifyEmail(String email){
        Random random = new Random();
        // Generate a random number between 100000 and 999999 (inclusive)
        String code = String.valueOf(100000 + random.nextInt(999999));

        EmailCodeObject emailCodeObject = new EmailCodeObject(email, code);
        EmailRequest request = new EmailRequest(email,"Quick Check email verification","Verify your email with "+code);

        if (userDao.existUserWithEmail(email)) {

            throw new DuplicateResourceException("Email already taken");
            }

        if (emailDao.existCodeWithEmail(email)){
            emailDao.updateCodeByEmail(emailCodeObject);
            sendEmail(request);
            return;
        }

        sendEmail(request);
        emailDao.saveCodeAndEmail(emailCodeObject);
    }

    public boolean verifyGivenCode(EmailVerificationRequest request){

        if (!emailDao.existCodeWithEmail(request.email())){
            throw new ResourceNotFoundException("Code has not been sent to %s".formatted(request.email()));
        }
        EmailCodeObject actual =  emailDao.getCodeByEmail(request.email()).get();

        if (actual.getEmail().equals(request.email()) && actual.getCode().equals(request.code())){
            return true;
        }
        return false;

    }
}
