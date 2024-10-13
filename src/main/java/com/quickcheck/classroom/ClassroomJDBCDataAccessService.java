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
        var sql= """
                SELECT id, classname, professorname, adminsid, studentsid, attendanceofstudents, attendancerecord, classlocation
                FROM "classroom"
                """;
        return jdbcTemplate.query(sql, classroomRowMapper);
    }

    @Override
    public Optional<Classroom> selectClassroomById(Integer id) {
        var sql = """
                SELECT id, classname, professorname, adminsid, studentsid, attendanceofstudents, attendancerecord, classlocation
                FROM "classroom"
                WHERE id=?
                """;
        return jdbcTemplate.query(sql, classroomRowMapper, id)
                .stream()
                .findFirst();
    }

    @Override
    public void insertClassroom(Classroom classroom) {
        var sql= """
                INSERT INTO "classroom"(classname, professorname, adminsid, studentsid, attendanceofstudents, attendancerecord, classlocation)
                VALUES(?,?,?,?,?,?,?)
                """;
        int result = jdbcTemplate.update(
                sql,
                classroom.getClassName(),
                classroom.getProfessorName(),
                classroom.getAdminsId().toArray(new Integer[0]),
                classroom.getStudentsId().toArray(new Integer[0]),
                // Assuming attendanceOfStudents and attendanceRecord are serializable to array
                (Object[]) classroom.getAttendanceOfStudents().toArray(new String[0]),
                (Object[]) classroom.getAttendanceRecord().toArray(new Object[0]),
                classroom.getClassLocation()
        );
        System.out.println("jdbcTemplate result = " + result);
    }

    @Override
    public boolean existClassroomByName(String name) {
        var sql = """
                SELECT count(id)
                FROM "classroom"
                WHERE classname=?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, name);
        return count != null && count>0;
    }

    @Override
    public void deleteClassroomById(Integer id) {
        var sql = """
                DELETE
                FROM "classroom"
                WHERE id=?
                """;
        Integer result = jdbcTemplate.update(sql, id);
        System.out.println("deleteClassroomById result = "+ result);
    }

    @Override
    public boolean existClassroomById(Integer id) {
        var sql = """
                SELECT count(id)
                FROM "classroom"
                WHERE id=?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count>0;
    }

    @Override
    public void updateClassroom(Classroom update) {
        var sql = """
                UPDATE "classroom"
                SET classname = ?, 
                    professorname = ?,
                    adminsid = ?,
                    studentsid = ?,
                    attendanceofstudents = ?,
                    attendancerecord = ?,
                    classlocation = ?
                WHERE id = ?
                """;
        int result = jdbcTemplate.update(
                sql,
                update.getClassName(),
                update.getProfessorName(),
                update.getAdminsId().toArray(new Integer[0]),
                update.getStudentsId().toArray(new Integer[0]),
                (Object[]) update.getAttendanceOfStudents().toArray(new String[0]),
                (Object[]) update.getAttendanceRecord().toArray(new Object[0]),
                update.getClassLocation(),
                update.getId()
        );
        System.out.println("update classroom result = " + result);
    }

    @Override
    public Optional<Classroom> selectClassroomByName(String name) {
        var sql = """
                SELECT id, classname, professorname, adminsid, studentsid, attendanceofstudents, attendancerecord, classlocation
                FROM "classroom"
                WHERE classname=?
                """;
        return jdbcTemplate.query(sql, classroomRowMapper, name)
                .stream()
                .findFirst();
    }
}