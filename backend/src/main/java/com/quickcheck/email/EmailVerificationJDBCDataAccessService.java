package com.quickcheck.email;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository("email")
public class EmailVerificationJDBCDataAccessService implements EmailDao {

    private final JdbcTemplate jdbcTemplate;
    private final EmailCodeObjectRowMapper emailCodeObjectRowMapper;

    public EmailVerificationJDBCDataAccessService(JdbcTemplate jdbcTemplate, EmailCodeObjectRowMapper emailCodeObjectRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.emailCodeObjectRowMapper = emailCodeObjectRowMapper;
    }

    @Override
    public Optional<EmailCodeObject> getVerifyEmailByEmail(String email) {

        var sql= """
                SELECT id, email, code
                FROM email_check
                WHERE email= ?
                """;

        return jdbcTemplate.query(sql,emailCodeObjectRowMapper,email)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<EmailCodeObject> getVerifyEmailById(Integer id) {

        var sql= """
                SELECT id, email, code
                FROM email_check
                WHERE id= ?
                """;

        return jdbcTemplate.query(sql,emailCodeObjectRowMapper,id)
                .stream()
                .findFirst();
    }

    @Override
    public boolean existVerifyCodeWithEmail(String email) {
        var sql = """
                SELECT count(id)
                FROM email_check
                WHERE email=?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class,email);
        return count != null &&count>0;
    }

    @Override
    public void saveVerifyEmail(EmailCodeObject request) {

        var sql= """
                INSERT INTO email_check(email, code)
                VALUES(?,?)
                """;

        int result = jdbcTemplate.update(
                sql,
                request.getEmail(),
                request.getCode()
        );
        System.out.println("jdbcTemplate.result = "+result);

    }

    @Override
    public void updateVerifyCodeByEmail(EmailCodeObject update) {
            String sql = """
                    UPDATE email_check 
                    SET code = ? 
                    WHERE email = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getCode(),
                    update.getEmail()
            );
            System.out.println("result = " +result);

    }

    @Override
    public void deleteVerifyCodeByEmail(String email) {

        var sql = """
                DELETE
                FROM email_check
                WHERE email=?
                """;
        Integer result = jdbcTemplate.update(sql, email);
        System.out.println("deleteUserById result = "+ result);

    }

    @Override
    public boolean existPasswordResetCodeWithEmail(String email) {
        var sql = """
                SELECT count(id)
                FROM password_reset_email
                WHERE email = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class,email);
        return count != null &&count>0;
    }

    @Override
    public void savePasswordResetEmail(EmailCodeObject request) {

        var sql= """
                INSERT INTO password_reset_email(email, code)
                VALUES(?,?)
                """;

        int result = jdbcTemplate.update(
                sql,
                request.getEmail(),
                request.getCode()
        );
        System.out.println("jdbcTemplate.result = "+result);
    }

    @Override
    public void updatePasswordResetCodeByEmail(EmailCodeObject update) {
        String sql = """
                    UPDATE password_reset_email 
                    SET code = ? 
                    WHERE email = ?
                    """;
        int result = jdbcTemplate.update(
                sql,
                update.getCode(),
                update.getEmail()
        );
        System.out.println("update user schoolName result = " +result);

    }

    @Override
    public void deletePasswordResetCodeByEmail(String email) {

        var sql = """
                DELETE
                FROM password_reset_email
                WHERE email=?
                """;
        Integer result = jdbcTemplate.update(sql, email);
        System.out.println("deleteUserById result = "+ result);

    }

    @Override
    public Optional<EmailCodeObject> getPasswordResetEmailByEmail(String email) {

        var sql= """
                SELECT id, email, code
                FROM password_reset_email
                WHERE email= ?
                """;

        return jdbcTemplate.query(sql,emailCodeObjectRowMapper,email)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<EmailCodeObject> getPasswordResetEmailById(Integer id) {

        var sql= """
                SELECT id, email, code
                FROM password_reset_email
                WHERE id= ?
                """;

        return jdbcTemplate.query(sql,emailCodeObjectRowMapper,id)
                .stream()
                .findFirst();
    }
}
