package com.quickcheck.event;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class EventRowMapper implements RowMapper<Event> {
    @Override
    public Event mapRow(ResultSet rs, int rowNum) throws SQLException {
        Event event = new Event(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getTimestamp("date_time").toLocalDateTime(),
                rs.getString("location"),
                rs.getInt("organization_id"),
                rs.getString("description")
        );
        return event;
    }
}
