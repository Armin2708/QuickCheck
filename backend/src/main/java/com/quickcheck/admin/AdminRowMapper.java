package com.quickcheck.admin;

import com.quickcheck.Gender;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;

@Component
public class AdminRowMapper implements RowMapper<Admin> {
    @Override
    public Admin mapRow(ResultSet rs, int rowNum) throws SQLException {
        Admin admin = new Admin();
        admin.setId(rs.getInt("id"));
        admin.setSchoolName(rs.getString("schoolname"));
        admin.setName(rs.getString("name"));
        admin.setAddress(rs.getString("address"));
        admin.setEmail(rs.getString("email"));
        admin.setPassword(rs.getString("password"));
        admin.setDateOfBirth(rs.getString("dateofbirth"));
        admin.setGender(Gender.valueOf(rs.getString("gender")));
        admin.setClassesId(Arrays.asList((Integer[])rs.getArray("classesid").getArray()));

        return admin;
    }
}