package com.quickcheck.calendar;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.ZoneId;

@Component
public class CalendarEventRowMapper implements RowMapper<CalendarEvent> {
    @Override
    public CalendarEvent mapRow(ResultSet rs, int rowNum) throws SQLException {
        CalendarEvent event = new CalendarEvent(
                rs.getInt("id"),
                rs.getString("title"),
                rs.getString("description"),
                rs.getTimestamp("start_date_time").toInstant().atZone(ZoneId.of("UTC")), // Convert directly to ZonedDateTime
                rs.getTimestamp("end_date_time").toInstant().atZone(ZoneId.of("UTC")),
                rs.getInt("creator_id"),
                rs.getInt("class_id")
                );
        return event;
    }
}
