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
        admin.setPassword(rs.getString("password")); // Please note that it's not secure to store and retrieve plain text passwords
        admin.setDateOfBirth(rs.getString("dateofbirth")); // Set type to match your database scheme

        // assuming the gender is stored as a string in the database
        admin.setGender(Gender.valueOf(rs.getString("gender")));

        Integer[] classesIdArray = (Integer[])rs.getArray("classesid").getArray();
        admin.setClassesId(Arrays.asList(classesIdArray));

        return admin;
    }
}