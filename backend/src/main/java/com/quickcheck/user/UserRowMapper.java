package com.quickcheck.user;

import com.quickcheck.Gender;
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
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setSchoolName(rs.getString("schoolname"));
        user.setName(rs.getString("name"));
        user.setAddress(rs.getString("address"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setDateOfBirth(rs.getString("dateofbirth"));
        user.setGender(Gender.valueOf(rs.getString("gender")));
        user.setClassesId(Arrays.asList((Integer[])rs.getArray("classesid").getArray()));

        return user;
    }
}
