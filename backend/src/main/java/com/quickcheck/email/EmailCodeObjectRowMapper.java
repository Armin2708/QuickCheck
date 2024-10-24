package com.quickcheck.email;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class EmailCodeObjectRowMapper implements RowMapper<EmailCodeObject> {
    @Override
    public EmailCodeObject mapRow(ResultSet rs, int rowNum) throws SQLException {
        EmailCodeObject emailCodeObject = new EmailCodeObject(
        rs.getInt("id"),
        rs.getString("email"),
        rs.getString("code")
        );
        return emailCodeObject;
    }
}
