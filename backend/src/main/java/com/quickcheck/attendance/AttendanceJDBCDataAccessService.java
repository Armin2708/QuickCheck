package com.quickcheck.attendance;

import com.quickcheck.user.roles.UserRolesRowMapper;
import com.quickcheck.user.UserRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("attendance")
public class AttendanceJDBCDataAccessService implements AttendanceDao {

    private final JdbcTemplate jdbcTemplate;
    private final AttendanceRowMapper attendanceRowMapper;
    private final UserRowMapper userRowMapper;
    private final UserRolesRowMapper userRolesRowMapper;

    public AttendanceJDBCDataAccessService(JdbcTemplate jdbcTemplate, AttendanceRowMapper attendanceRowMapper, UserRowMapper userRowMapper, UserRolesRowMapper userRolesRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.attendanceRowMapper = attendanceRowMapper;
        this.userRowMapper = userRowMapper;
        this.userRolesRowMapper = userRolesRowMapper;
    }



    @Override
    public List<Attendance> selectAllAttendances() {
        var sql = """
                SELECT id, tag, date, instructor_id, class_id, code, open_status, class_radius
                FROM attendance
                """;
        return jdbcTemplate.query(sql, attendanceRowMapper);
    }

    @Override
    public Optional<Attendance> selectAttendance(String attendanceTag) {
        var sql = """
                SELECT id, tag, date, instructor_id, class_id, code, open_status, class_radius
                FROM attendance
                WHERE tag = ? 
                """;
        return jdbcTemplate.query(sql, attendanceRowMapper,attendanceTag)
                .stream()
                .findFirst();
    }

    @Override
    public boolean existAttendanceWithTag(String tag) {
        var sql = """
                SELECT count(id)
                FROM attendance
                WHERE tag = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, tag);
        return count != null && count > 0;
    }


    @Override
    public void createAttendance(Attendance attendance) {
        var sql = """
                INSERT INTO attendance (tag, date, instructor_id, class_id, code, open_status, class_radius)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """;
        int result = jdbcTemplate.update(
                sql,
                attendance.getTag(),
                attendance.getDate(),
                attendance.getProfessorId(),
                attendance.getClassId(),
                attendance.getCode(),
                attendance.isOpenStatus(),
                attendance.getRadius()
        );
        System.out.println("jdbcTemplate result = " + result);

    }

    @Override
    public void updateAttendance(Attendance update) {
        StringBuilder sqlBuilder = new StringBuilder("UPDATE attendance SET ");
        List<Object> params = new ArrayList<>();

        if (update.getTag() != null) {
            sqlBuilder.append("tag = ?, ");
            params.add(update.getTag());
        }

        if (update.getDate() != null) {
            sqlBuilder.append("date = ?, ");
            params.add(update.getDate());
        }

        if (update.getProfessorId() != null) {
            sqlBuilder.append("instructor_id = ?, ");
            params.add(update.getProfessorId());
        }

        if (update.getClassId() != null) {
            sqlBuilder.append("class_id = ?, ");
            params.add(update.getClassId());
        }
        if (update.getCode() != null) {
            sqlBuilder.append("code = ?, ");
            params.add(update.getCode());
        }

        if (update.isOpenStatus() !=null) {
            sqlBuilder.append("open_status = ?, ");
            params.add(update.isOpenStatus());
        }
        if (update.getRadius() != null) {
            sqlBuilder.append("class_radius = ?, ");
            params.add(update.getRadius());
        }

        // Check if there are fields to update
        if (params.isEmpty()) {
            System.out.println("No fields to update for attendance with ID: " + update.getId());
            return;
        }

        // Remove the last comma and add the WHERE clause
        sqlBuilder.setLength(sqlBuilder.length() - 2);
        sqlBuilder.append(" WHERE tag = ?");
        params.add(update.getTag());

        // Execute the single update statement
        String sql = sqlBuilder.toString();
        int result = jdbcTemplate.update(sql, params.toArray());
        System.out.println("Update attendance result = " + result);

    }

    @Override
    public void deleteAttendance(String attendanceTag) {
        var sql = """
                DELETE
                FROM attendance
                WHERE id = ?
                """;
        int result = jdbcTemplate.update(sql, attendanceTag);
        System.out.println("deleteAttendance result = " + result);

    }

    @Override
    public void joinAttendance(Integer attendanceId, Integer userId) {

        var sql = """
                INSERT INTO attendance_user (attendance_id, user_id)
                VALUES (?, ?)
                """;
        int result = jdbcTemplate.update(
                sql,attendanceId,userId
        );
        System.out.println("jdbcTemplate result = " + result);
    }
}
