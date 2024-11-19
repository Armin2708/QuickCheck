package com.quickcheck.classes;

import com.quickcheck.classroom.Classroom;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("class")
public class ClassJDBCDataAccessService implements ClassDao {

    private final JdbcTemplate jdbcTemplate;
    private final ClassRowMapper classRowMapper;

    public ClassJDBCDataAccessService(JdbcTemplate jdbcTemplate, ClassRowMapper classRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.classRowMapper = classRowMapper;
    }

    @Override
    public List<Class> selectAllClasses() {
        var sql = """
                SELECT id, name, professor_id, start_date, end_date, classroom_id, organization_id, class_image_id
                FROM classes
                """;
        return jdbcTemplate.query(sql, classRowMapper);
    }

    @Override
    public List<Class> selectClassesOfUserInOrganization(Integer userId, Integer orgId) {
        var sql = """
                SELECT classes.id, classes.name, classes.professor_id, classes.start_date, 
                classes.end_date, classes.classroom_id, classes.organization_id, classes.class_image_id
                FROM classes
                JOIN class_user ON classes.id = class_user.class_id
                WHERE class_user.user_id = ? AND classes.organization_id = ?
                """;
        return jdbcTemplate.query(sql, classRowMapper,userId,orgId);
    }

    @Override
    public List<Class> selectClassesOfProfessorInOrganization(Integer professorId, Integer orgId) {
        var sql = """
                SELECT id, name, professor_id, start_date, end_date, classroom_id, organization_id, class_image_id
                FROM classes
                WHERE professor_id = ? AND organization_id = ?
                """;
        return jdbcTemplate.query(sql, classRowMapper,professorId,orgId);
    }

    @Override
    public List<Class> selectClassesOfOrganization(Integer orgId) {
        var sql = """
                SELECT id, name, professor_id, start_date, 
                end_date, classroom_id, organization_id, class_image_id
                FROM classes
                WHERE organization_id = ?
                """;
        return jdbcTemplate.query(sql, classRowMapper,orgId);
    }


    @Override
    public Optional<Class> selectClassById(Integer id) {
        var sql = """
                SELECT id, name, professor_id, start_date, end_date, classroom_id, organization_id, class_image_id
                FROM classes
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql, classRowMapper, id)
                .stream()
                .findFirst();
    }

    @Override
    public boolean existClassById(Integer id) {
        var sql = """
                SELECT count(id)
                FROM classes
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }

    @Override
    public boolean existClassesInOrganization(Integer orgId) {
        var sql = """
                SELECT count(id)
                FROM classes
                WHERE organization_id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, orgId);
        return count != null && count > 0;
    }

    @Override
    public boolean existUserInClass(Integer classId, Integer userId) {
        var sql = """
                SELECT count(id)
                FROM class_user
                WHERE user_id = ? AND class_id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId,classId);
        return count != null && count > 0;
    }

    @Override
    public boolean existClassesOfUser(Integer userId) {
        var sql = """
                SELECT count(classes.id)
                FROM classes 
                JOIN class_user ON classes.id = class_user.class_id
                WHERE class_user.user_id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
        return count != null && count > 0;
    }


    @Override
    public void insertClass(Class classObject) {
        var sql = """
                INSERT INTO classes (name, professor_id, start_date, end_date, classroom_id, organization_id)
                VALUES (?, ?, ?, ?, ?, ?)
                """;
        int result = jdbcTemplate.update(
                sql,
                classObject.getName(),
                classObject.getProfessorId(),
                classObject.getStartDate(),
                classObject.getEndDate(),
                classObject.getClassroomId(),
                classObject.getOrganizationId()
        );
        System.out.println("jdbcTemplate result = " + result);
    }

    @Override
    public void joinClass(Integer classId, Integer userId) {
        var sql = """
                INSERT INTO class_user (user_id, class_id)
                VALUES (?,?)
                """;
        int result = jdbcTemplate.update(
                sql,userId,classId
        );
        System.out.println("jdbcTemplate result = " + result);
    }

    @Override
    public void leaveClass(Integer classId, Integer userId) {
        var sql = """
                DELETE
                FROM class_user
                WHERE user_id = ? AND class_id = ?
                """;
        int result = jdbcTemplate.update(sql, userId,classId);
        System.out.println("deleteOrganizationById result = " + result);
    }

    @Override
    @Transactional
    public void updateClass(Class update) {
        StringBuilder sqlBuilder = new StringBuilder("UPDATE classes SET ");
        List<Object> params = new ArrayList<>();

        if (update.getName() != null) {
            sqlBuilder.append("name = ?, ");
            params.add(update.getName());
        }
        if (update.getProfessorId() != null) {
            sqlBuilder.append("professor_id = ?, ");
            params.add(update.getProfessorId());
        }
        if (update.getStartDate() != null) {
            sqlBuilder.append("start_date = ?, ");
            params.add(update.getStartDate());
        }
        if (update.getEndDate() != null) {
            sqlBuilder.append("end_date = ?, ");
            params.add(update.getEndDate());
        }
        if (update.getClassroomId() != null) {
            sqlBuilder.append("classroom_id = ?, ");
            params.add(update.getClassroomId());
        }
        if (update.getOrganizationId() != null) {
            sqlBuilder.append("organization_id = ?, ");
            params.add(update.getOrganizationId());
        }

        // Check if there are fields to update
        if (params.isEmpty()) {
            System.out.println("No fields to update for class with ID: " + update.getId());
            return;
        }

        // Remove the last comma and add the WHERE clause
        sqlBuilder.setLength(sqlBuilder.length() - 2);
        sqlBuilder.append(" WHERE id = ?");
        params.add(update.getId());

        // Execute the single update statement
        String sql = sqlBuilder.toString();
        int result = jdbcTemplate.update(sql, params.toArray());
        System.out.println("Update class result = " + result);
    }

    @Override
    public void deleteClassById(Integer id) {
        var sql = """
                DELETE
                FROM classes
                WHERE id = ?
                """;
        int result = jdbcTemplate.update(sql, id);
        System.out.println("deleteClassById result = " + result);
    }

    @Override
    public void updateClassImageId(String profileImageId, Integer userId) {
        var sql = """
                UPDATE classes
                SET class_image_id = ?
                WHERE id = ?
                """;
        jdbcTemplate.update(sql, profileImageId, userId);
    }

}
