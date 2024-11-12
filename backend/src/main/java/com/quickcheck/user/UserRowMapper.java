package com.quickcheck.user;

import com.quickcheck.Gender;
import com.quickcheck.Roles;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

@Component
public class UserRowMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        LocalDate dateOfBirth = rs.getDate("date_of_birth").toLocalDate();

        return new User(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("address"),
                rs.getString("email"),
                rs.getString("password"),
                dateOfBirth,
                Gender.valueOf(rs.getString("gender")),
                null, // Set roles to null or populate as needed
                rs.getString("profile_image_id")
        );
    }
}
