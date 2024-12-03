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
                SELECT id, name, location, capacity, organization_id
                FROM classrooms
                """;
        return jdbcTemplate.query(sql, classroomRowMapper);
    }

    @Override
    public List<Classroom> selectAllOrganizationClassrooms(Integer organizationId) {
        var sql = """
                SELECT id, name, location, capacity, organization_id
                FROM classrooms
                WHERE organization_id = ?
                """;
        return jdbcTemplate.query(sql, classroomRowMapper, organizationId);
    }


    @Override
    public Optional<Classroom> selectClassroomById(Integer id) {
        var sql = """
                SELECT id, name, location, capacity, organization_id
                FROM classrooms
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql, classroomRowMapper, id)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<Classroom> selectClassroomByNameAndOrganization(String name, Integer organizationId) {
        var sql = """
                SELECT id, name, location, capacity, organization_id
                FROM classrooms
                WHERE name = ? AND organization_id = ?
                """;
        return jdbcTemplate.query(sql, classroomRowMapper, name, organizationId)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<Classroom> selectClassroomByName(String name) {
        var sql = """
                SELECT id, name, location, capacity, organization_id
                FROM classrooms
                WHERE name = ?
                """;
        return jdbcTemplate.query(sql, classroomRowMapper, name)
                .stream()
                .findFirst();
    }

    @Override
    public void insertClassroom(Classroom classroom) {
        var sql = """
                INSERT INTO classrooms (name, location, capacity, organization_id)
                VALUES (?, ?, ?, ?)
                """;
        int result = jdbcTemplate.update(
                sql,
                classroom.getName(),
                classroom.getLocation(),
                classroom.getCapacity(),
                classroom.getOrganizationId()
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
    public boolean existClassroomByNameAndOrganizationId(String name, Integer organizationId) {
        var sql = """
                SELECT count(id)
                FROM classrooms
                WHERE name = ? AND organization_id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, name, organizationId);
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

        if (update.getName() != null) {
            sqlBuilder.append("name = ?, ");
            params.add(update.getName());
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
