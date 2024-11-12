package com.quickcheck.email;

import java.util.Optional;

public interface EmailDao {

    Optional<EmailCodeObject> getEmailObjectByEmail(String email);
    Optional<EmailCodeObject> getEmailObjectById(Integer id);

    boolean existCodeWithEmail(String email);

    void saveCodeAndEmail(EmailCodeObject emailCodeObject);

    void updateCodeByEmail(EmailCodeObject emailCodeObject);

    void deleteCodeByEmail(String email);


}
