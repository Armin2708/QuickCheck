package com.quickcheck.user;

import com.quickcheck.Gender;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
        Array sqlArray = rs.getArray("classesid");
        if (sqlArray != null) {
            // Retrieve the SQL array as an Integer[] (PostgreSQL INTEGER[])
            Integer[] classesIdArray = (Integer[]) sqlArray.getArray();  // Cast to Integer[]

            // Convert Integer[] to List<Integer>
            List<Integer> classesIdList = Arrays.asList(classesIdArray);  // Convert to List

            // Set the List<Integer> in the User object
            user.setClassesId(classesIdList); // Assuming `setClassesId` now expects a List<Integer>
        }

        return user;
    }
}
