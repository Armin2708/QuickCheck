package com.quickcheck.email;

import com.quickcheck.exception.DuplicateResourceException;
import com.quickcheck.exception.InvalidAccessCodeException;
import com.quickcheck.exception.ResourceNotFoundException;
import com.quickcheck.user.User;
import com.quickcheck.user.UserDao;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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

    private void checkIfUserExists(String userEmail){
        if (!userDao.existUserWithEmail(userEmail)) {
            throw new DuplicateResourceException("User with email [%s] does not exist".formatted(userEmail));
        }
    }
    private void checkIfUserExistsById(Integer id){
        if (!userDao.existUserById(id)) {
            throw new DuplicateResourceException("User with id [%s] does not exist".formatted(id));
        }
    }

    public String sendEmail(EmailRequest emailRequest,String buttonName){
        try{
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(emailRequest.to());
            helper.setSubject(emailRequest.subject());

            // HTML content for the email body with inline styling
            String htmlBody = "<html>" +
                    "<body style='font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;'>" +
                    "<div style='max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);'>" +
                    "<h2 style='color: #4a90e2; text-align: center;'>Hello!</h2>" +
                    "<p style='color: #333333; font-size: 16px;'>"+ emailRequest.body() + "</p>" +
                    "<p style='color: #666666; font-size: 14px;'>Thank's for joining Quick Check. If you have any questions, feel free to reach out.</p>" +
                    "<p style='text-align: center;'>" +
                    "<a href="+emailRequest.url()+" style='text-decoration: none; color: #ffffff; background-color: #4a90e2; padding: 10px 20px; border-radius: 5px;'>"+buttonName+"</a>" +
                    "</p>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            // Set the HTML content in the email
            helper.setText(htmlBody, true); // second parameter 'true' indicates HTML content
            javaMailSender.send(mimeMessage);

            return "Email successfully sent";
        }catch (Exception e){
            return e.getMessage();
        }
    }

    public void verifyEmail(EmailCodeCreationRequest request){

        String userEmail = request.email();

        Random random = new Random();
        String code = String.valueOf(100000 + random.nextInt(900000));

        EmailCodeObject emailCodeObject = new EmailCodeObject(userEmail, code);

        if (emailDao.existVerifyCodeWithEmail(userEmail)){
            emailDao.updateVerifyCodeByEmail(emailCodeObject);
        }
        else {
            emailDao.saveVerifyEmail(emailCodeObject);
        }
        Integer token=emailDao.getVerifyEmailByEmail(userEmail).get().getId();

        EmailRequest emailRequest = new EmailRequest(
                userEmail,
                "Quick Check email verification",
                "Verify your email with "+code,
                request.url()+"&token="+token);

        sendEmail(emailRequest,"Verify Email");

    }

    public EmailCodeVerificationResponse verifyEmailGivenCode(EmailVerificationRequest request){
        String email = request.email();
        if (email == null || email.isEmpty() ){
            email = emailDao.getVerifyEmailById(request.token())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "no email sent with id [%s] not found".formatted(request.token())
                    )).getEmail();
        }

        if (!emailDao.existVerifyCodeWithEmail(email)) {
            throw new ResourceNotFoundException(
                    "Code has not been sent to %s".formatted(request.email())
            );
        }
        EmailCodeObject actual =  emailDao.getVerifyEmailByEmail(email).get();

        if (!(actual.getCode().equals(request.code()))
        ){
            throw new InvalidAccessCodeException("Wrong Code");
        }

        return new EmailCodeVerificationResponse(actual.getEmail());
    }


    public void passwordResetEmail(EmailCodeCreationRequest request){
        String userEmail = request.email();

        checkIfUserExists(userEmail);

        Random random = new Random();
        String code = String.valueOf(100000 + random.nextInt(900000));

        EmailCodeObject emailCodeObject = new EmailCodeObject(userEmail, code);

        if (emailDao.existPasswordResetCodeWithEmail(userEmail)){
            emailDao.updatePasswordResetCodeByEmail(emailCodeObject);
        }
        else {
            emailDao.savePasswordResetEmail(emailCodeObject);
        }
        Integer token=emailDao.getVerifyEmailByEmail(userEmail).get().getId();

        EmailRequest emailRequest = new EmailRequest(
                userEmail,
                "Quick Check Password Reset",
                "Reset your password with "+code,
                request.url()+"&token="+token);

        sendEmail(emailRequest,"Reset Password");
    }

    public EmailCodeVerificationResponse passwordResetEmailGivenCode(EmailVerificationRequest request){
        String email = request.email();
        if (email == null || email.isEmpty() ){
            email = emailDao.getPasswordResetEmailById(request.token())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "no email sent with id [%s] not found".formatted(request.token())
                    )).getEmail();
        }

        if (!emailDao.existPasswordResetCodeWithEmail(email)) {
            throw new ResourceNotFoundException(
                    "Code has not been sent to %s".formatted(request.email())
            );
        }
        EmailCodeObject actual =  emailDao.getPasswordResetEmailByEmail(email).get();

        if (!(actual.getCode().equals(request.code()))
        ){
            throw new InvalidAccessCodeException("Wrong Code");
        }

        return new EmailCodeVerificationResponse(actual.getEmail());
    }
}
