package com.quickcheck.organizationEvent;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.sql.Timestamp;

@Component
public class EventRowMapper implements RowMapper<Event> {
    @Override
    public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
        // Retrieve the timestamp and handle potential NULL values
        Timestamp timestamp = rs.getTimestamp("date_time");
        ZonedDateTime dateTime = timestamp != null
                ? timestamp.toInstant().atZone(ZoneId.of("UTC"))
                : null;

        return new Event(
                rs.getInt("id"),
                rs.getString("name"),
                dateTime, // Pass the ZonedDateTime or null
                rs.getString("location"),
                rs.getInt("organization_id"),
                rs.getString("description")
        );
    }
}