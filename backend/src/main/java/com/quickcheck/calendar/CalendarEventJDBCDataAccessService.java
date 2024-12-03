package com.quickcheck.calendar;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;


@Repository("calendar_events")
public class CalendarEventJDBCDataAccessService implements CalendarEventDao {

    private final JdbcTemplate jdbcTemplate;
    private final CalendarEventRowMapper eventRowMapper;

    public CalendarEventJDBCDataAccessService(JdbcTemplate jdbcTemplate, CalendarEventRowMapper eventRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.eventRowMapper = eventRowMapper;
    }

    @Override
    public List<CalendarEvent> selectAllEvents() {

        var sql = """
                SELECT id, title, description, start_date_time, end_date_time, creator_id, class_id
                FROM calendar_events
                """;
        return jdbcTemplate.query(sql,eventRowMapper);
    }

    @Override
    public List<CalendarEvent> selectAllClassEvents(Integer classId) {
        var sql = """
                SELECT id, title, description, start_date_time, end_date_time, creator_id, class_id
                FROM calendar_events
                WHERE class_id = ?
                """;
        return jdbcTemplate.query(sql,eventRowMapper,classId);
    }

    @Override
    public List<CalendarEvent> selectAllUserEvents(Integer userId) {
        var sql = """
                SELECT id, title, description, start_date_time, end_date_time, creator_id, class_id
                FROM calendar_events
                WHERE creator_id = ?
                """;
        return jdbcTemplate.query(sql,eventRowMapper, userId);
    }

    @Override
    public Optional<CalendarEvent> selectEventById(Integer eventId) {
        var sql = """
                SELECT id, title, description, start_date_time, end_date_time, creator_id, class_id
                FROM calendar_events
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql,eventRowMapper, eventId).stream().findFirst();
    }

    @Override
    public void insertEvent(CalendarEvent event) {
        var sql = """
                INSERT INTO calendar_events(title, description, start_date_time, end_date_time, creator_id, class_id)
                VALUES (?,?,?,?,?,?)
                """;

        int result = jdbcTemplate.update(sql,
                event.getTitle(),
                event.getDescription(),
                Timestamp.from(event.getStart().toInstant()), // Convert ZonedDateTime to Timestamp
                Timestamp.from(event.getEnd().toInstant()),   // Convert ZonedDateTime to Timestamp
                event.getCreatorId(),
                event.getClassId()
                );
        System.out.println("Result : "+result);
    }

    @Override
    public void updateEvent(CalendarEvent update) {

        var sql = """
                UPDATE calendar_events
                SET title = ?, description = ?, start_date_time = ?, end_date_time = ?
                WHERE id = ?
                """;

        int result = jdbcTemplate.update(sql,
                update.getTitle(),
                update.getDescription(),
                Timestamp.from(update.getStart().toInstant()),
                Timestamp.from(update.getEnd().toInstant()),
                update.getId()
        );
        System.out.println("Result : "+result);
    }

    @Override
    public void deleteEvent(Integer eventId) {
        var sql = """
                DELETE FROM calendar_events
                WHERE id = ?
                """;
        int result = jdbcTemplate.update(sql,eventId);
        System.out.println("Result : "+result);
    }

    @Override
    public boolean existEventById(Integer eventId) {
        var sql = """
                SELECT count(id)
                FROM calendar_events
                WHERE id = ?
                """;

        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, eventId);

        return count != null && count > 0;
    }
}
