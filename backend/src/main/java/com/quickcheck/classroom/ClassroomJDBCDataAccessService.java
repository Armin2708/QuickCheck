package com.quickcheck.classroom;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
                SELECT id, classname, professorid, adminsid, studentsid, classlocation, startdate, enddate, classdays
                FROM "classroom"
                """;
        return jdbcTemplate.query(sql, classroomRowMapper);
    }

    @Override
    public Optional<Classroom> selectClassroomById(Integer id) {
        var sql = """
                SELECT id, classname, professorid, adminsid, studentsid, classlocation, startdate, enddate, classdays
                FROM "classroom"
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql, classroomRowMapper, id)
                .stream()
                .findFirst();
    }

    @Override
    public void insertClassroom(Classroom classroom) {
        var sql = """
                INSERT INTO "classroom" (classname, professorid, classlocation, startdate, enddate, classdays, adminsid, studentsid)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """;
        int result = jdbcTemplate.update(
                sql,
                classroom.getClassName(),
                classroom.getProfessorId(),
                classroom.getClassLocation(),
                classroom.getStartDate(),
                classroom.getEndDate(),
                classroom.getClassDays().toArray(new String[0]),  // Insert classDays as TEXT[]
                classroom.getAdminsId().toArray(new Integer[0]),  // Insert adminsId as INT[]
                classroom.getStudentsId().toArray(new Integer[0])  // Insert studentsId as INT[]
        );
        System.out.println("jdbcTemplate result = " + result);
    }

    @Override
    public boolean existClassroomByName(String name) {
        var sql = """
                SELECT count(id)
                FROM "classroom"
                WHERE classname = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, name);
        return count != null && count > 0;
    }

    @Override
    public void deleteClassroomById(Integer id) {
        var sql = """
                DELETE
                FROM "classroom"
                WHERE id = ?
                """;
        int result = jdbcTemplate.update(sql, id);
        System.out.println("deleteClassroomById result = " + result);
    }

    @Override
    public boolean existClassroomById(Integer id) {
        var sql = """
                SELECT count(id)
                FROM "classroom"
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }

    @Override
    public void updateClassroom(Classroom update) {
        if (update.getClassName() != null) {
            String sql = """
                UPDATE "classroom"
                SET classname = ? 
                WHERE id = ?
                """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getClassName(),
                    update.getId()
            );
            System.out.println("update classroom className result = " + result);
        }

        if (update.getProfessorId() != null) {
            String sql = """
                UPDATE "classroom"
                SET professorid = ? 
                WHERE id = ?
                """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getProfessorId(),
                    update.getId()
            );
            System.out.println("update classroom professorId result = " + result);
        }

        if (update.getClassLocation() != null) {
            String sql = """
                UPDATE "classroom"
                SET classlocation = ? 
                WHERE id = ?
                """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getClassLocation(),
                    update.getId()
            );
            System.out.println("update classroom classLocation result = " + result);
        }

        if (update.getStartDate() != null) {
            String sql = """
                UPDATE "classroom"
                SET startdate = ? 
                WHERE id = ?
                """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getStartDate(),
                    update.getId()
            );
            System.out.println("update classroom startDate result = " + result);
        }

        if (update.getEndDate() != null) {
            String sql = """
                UPDATE "classroom"
                SET enddate = ? 
                WHERE id = ?
                """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getEndDate(),
                    update.getId()
            );
            System.out.println("update classroom endDate result = " + result);
        }

        if (update.getClassDays() != null) {
            String sql = """
                UPDATE "classroom"
                SET classdays = ? 
                WHERE id = ?
                """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getClassDays().toArray(new String[0]),
                    update.getId()
            );
            System.out.println("update classroom classDays result = " + result);
        }

        if (update.getAdminsId() != null) {
            String sql = """
                UPDATE "classroom"
                SET adminsid = ? 
                WHERE id = ?
                """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getAdminsId().toArray(new Integer[0]),
                    update.getId()
            );
            System.out.println("update classroom adminsId result = " + result);
        }

        if (update.getStudentsId() != null) {
            String sql = """
                UPDATE "classroom"
                SET studentsid = ? 
                WHERE id = ?
                """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getStudentsId().toArray(new Integer[0]),
                    update.getId()
            );
            System.out.println("update classroom studentsId result = " + result);
        }
    }

    @Override
    public Optional<Classroom> selectClassroomByName(String name) {
        var sql = """
                SELECT id, classname, professorid, adminsid, studentsid, classlocation, startdate, enddate, classdays
                FROM "classroom"
                WHERE classname = ?
                """;
        return jdbcTemplate.query(sql, classroomRowMapper, name)
                .stream()
                .findFirst();
    }
}
