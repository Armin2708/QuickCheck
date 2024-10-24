package com.quickcheck.email;

import java.util.Optional;

public interface EmailDao {

    Optional<EmailCodeObject> getCodeByEmail(String email);

    boolean existCodeWithEmail(String email);

    void saveCodeAndEmail(EmailCodeObject emailCodeObject);

    void updateCodeByEmail(EmailCodeObject emailCodeObject);

    void deleteCodeByEmail(String email);


}
