package com.quickcheck.classroom;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class ClassroomRowMapper implements RowMapper<Classroom> {
    @Override
    public Classroom mapRow(ResultSet rs, int rowNum) throws SQLException {
        Classroom classroom = new Classroom(
                rs.getInt("id"),
                rs.getString("room_name"),
                rs.getString("location"),
                rs.getInt("capacity")

        );
        return classroom;
    }
}