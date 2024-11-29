package com.quickcheck.email;

import java.util.Optional;

public interface EmailDao {

    Optional<EmailCodeObject> getVerifyEmailByEmail(String email);
    Optional<EmailCodeObject> getVerifyEmailById(Integer id);

    boolean existVerifyCodeWithEmail(String email);

    void saveVerifyEmail(EmailCodeObject emailCodeObject);

    void updateVerifyCodeByEmail(EmailCodeObject emailCodeObject);

    void deleteVerifyCodeByEmail(String email);



    Optional<EmailCodeObject> getPasswordResetEmailByEmail(String email);
    Optional<EmailCodeObject> getPasswordResetEmailById(Integer id);


    boolean existPasswordResetCodeWithEmail(String email);

    void updatePasswordResetCodeByEmail(EmailCodeObject emailCodeObject);

    void savePasswordResetEmail(EmailCodeObject emailCodeObject);

    void deletePasswordResetCodeByEmail(String email);




}
