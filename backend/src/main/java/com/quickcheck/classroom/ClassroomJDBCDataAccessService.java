package com.quickcheck.classroom;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("classroom")
public class ClassroomJDBCDataAccessService implements ClassroomDao {

    private final JdbcTemplate jdbcTemplate;
    private final ClassroomRowMapper classroomRowMapper;

    public ClassroomJDBCDataAccessService(JdbcTemplate jdbcTemplate, ClassroomRowMapper classroomRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.classroomRowMapper = classroomRowMapper;
    }

    @Override
    public List<Classroom> selectAllClassrooms() {
        var sql = """
                SELECT id, room_name, location, capacity
                FROM classrooms
                """;
        return jdbcTemplate.query(sql, classroomRowMapper);
    }


    @Override
    public Optional<Classroom> selectClassroomById(Integer id) {
        var sql = """
                SELECT id, room_name, location, capacity
                FROM classrooms
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql, classroomRowMapper, id)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<Classroom> selectClassroomByName(String name) {
        var sql = """
                SELECT id, room_name, location, capacity
                FROM classrooms
                WHERE room_name = ?
                """;
        return jdbcTemplate.query(sql, classroomRowMapper, name)
                .stream()
                .findFirst();
    }

    @Override
    public void insertClassroom(Classroom classroom) {
        var sql = """
                INSERT INTO classrooms (room_name, location, capacity)
                VALUES (?, ?, ?)
                """;
        int result = jdbcTemplate.update(
                sql,
                classroom.getRoomName(),
                classroom.getLocation(),
                classroom.getCapacity()
        );
        System.out.println("jdbcTemplate result = " + result);
    }

    @Override
    public boolean existClassroomById(Integer id) {
        var sql = """
                SELECT count(id)
                FROM classrooms
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }

    @Override
    public boolean existClassroomByName(String name) {
        var sql = """
                SELECT count(id)
                FROM classrooms
                WHERE room_name = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, name);
        return count != null && count > 0;
    }

    @Override
    public void deleteClassroomById(Integer id) {
        var sql = """
                DELETE
                FROM classrooms
                WHERE id = ?
                """;
        int result = jdbcTemplate.update(sql, id);
        System.out.println("deleteClassroomById result = " + result);
    }

    @Override
    @Transactional
    public void updateClassroom(Classroom update) {
        StringBuilder sqlBuilder = new StringBuilder("UPDATE classrooms SET ");
        List<Object> params = new ArrayList<>();

        if (update.getRoomName() != null) {
            sqlBuilder.append("room_name = ?, ");
            params.add(update.getRoomName());
        }
        if (update.getLocation() != null) {
            sqlBuilder.append("location = ?, ");
            params.add(update.getLocation());
        }
        if (update.getCapacity() != null) {
            sqlBuilder.append("capacity = ?, ");
            params.add(update.getCapacity());
        }

        // Check if there are fields to update
        if (params.isEmpty()) {
            System.out.println("No fields to update for classroom with ID: " + update.getId());
            return;
        }

        // Remove the last comma and add the WHERE clause
        sqlBuilder.setLength(sqlBuilder.length() - 2);
        sqlBuilder.append(" WHERE id = ?");
        params.add(update.getId());

        // Execute the single update statement
        String sql = sqlBuilder.toString();
        int result = jdbcTemplate.update(sql, params.toArray());
        System.out.println("Update classroom result = " + result);
    }
}
