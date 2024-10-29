package com.quickcheck.user;

import com.quickcheck.Gender;
import com.quickcheck.Roles;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

@Component
public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                User user = new User(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("address"),
                rs.getString("email"),
                rs.getString("password"),
                rs.getDate("date_of_birth"),
                Gender.valueOf(rs.getString("gender")),
                        null
        );
        return user;
    }
}
