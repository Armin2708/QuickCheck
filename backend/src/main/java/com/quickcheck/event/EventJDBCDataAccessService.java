package com.quickcheck.event;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("event")
public class EventJDBCDataAccessService implements EventDao{

    private final JdbcTemplate jdbcTemplate;
    private final EventRowMapper eventRowMapper;

    public EventJDBCDataAccessService(JdbcTemplate jdbcTemplate, EventRowMapper eventRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.eventRowMapper = eventRowMapper;
    }


    @Override
    public List<Event> selectAllEvents() {
        var sql = """
                SELECT id, name, date_time, location, organization_id, description
                FROM events
                """;
        return jdbcTemplate.query(sql,eventRowMapper);
    }

    @Override
    public List<Event> selectAllOrganizationEvents(Integer organizationId) {
        var sql = """
                SELECT id, name, date_time, location, organization_id, description
                FROM events
                WHERE organization_id = ?
                """;
        return jdbcTemplate.query(sql,eventRowMapper,organizationId);
    }

    @Override
    public Optional<Event> selectEventById(Integer eventId) {
        var sql = """
                SELECT id, name, date_time, location, organization_id, description
                FROM events
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql,eventRowMapper,eventId)
                .stream()
                .findFirst();
    }

    @Override
    public void insertEvent(Event event) {
        var sql = """
                INSERT INTO events(name, date_time, location, organization_id, description)
                VALUES (?,?,?,?,?)
                """;

        int result = jdbcTemplate.update(sql,
                event.getName(),
                event.getDateTime(),
                event.getLocation(),
                event.getOrganizationId(),
                event.getDescription()
        );
        System.out.println("Result: "+result);
    }

    @Override
    public boolean existEventById(Integer eventId) {
        var sql = """
                SELECT count(id)
                FROM events
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, eventId);
        return count != null && count > 0;
    }

    @Override
    public void updateEvent(Event update) {
        var sql = """
                UPDATE events
                SET name = ?, date_time = ?, location = ?, description = ?
                WHERE id = ?
                """;
        int result = jdbcTemplate.update(sql,
                update.getName(),
                update.getDateTime(),
                update.getLocation(),
                update.getDescription(),
                update.getId()
        );
        System.out.println("Result: "+result);
    }

    @Override
    public void deleteEvent(Integer eventId) {
        var sql = """
                DELETE FROM events
                WHERE id = ?
                """;
        int result = jdbcTemplate.update(sql,eventId);
        System.out.println("Result: "+result);

    }
}
