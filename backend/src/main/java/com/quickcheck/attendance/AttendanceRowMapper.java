package com.quickcheck.attendance;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class AttendanceRowMapper implements RowMapper<Attendance> {
    @Override
    public Attendance mapRow(ResultSet rs, int rowNum) throws SQLException {
        Attendance attendance = new Attendance(
                rs.getInt("id"),
                rs.getString("tag"),
                rs.getDate("date").toLocalDate(),
                rs.getInt("instructor_id"),
                rs.getInt("class_id"),
                rs.getInt("code"),
                rs.getBoolean("open_status"),
                rs.getInt("class_radius")
        );

        return attendance;
    }
}
