package com.quickcheck.classroom;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;

@Component
public class ClassroomRowMapper implements RowMapper<Classroom> {
    @Override
    public Classroom mapRow(ResultSet rs, int rowNum) throws SQLException {
        Classroom classroom = new Classroom(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getInt("professorId"),
                rs.getString("location"),
                rs.getString("startDate"),
                rs.getString("endDate"),
                Arrays.asList((String[])rs.getArray("classDays").getArray()),
                Arrays.asList((Integer[])rs.getArray("studentsId").getArray()),
                Arrays.asList((Integer[])rs.getArray("adminsId").getArray())

        );

        return classroom;
    }
}