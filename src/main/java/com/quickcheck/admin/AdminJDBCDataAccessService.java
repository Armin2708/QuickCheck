package com.quickcheck.admin;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("admin")
public class AdminJDBCDataAccessService implements AdminDao {

    private final JdbcTemplate jdbcTemplate;
    private final AdminRowMapper adminRowMapper;

    public AdminJDBCDataAccessService(JdbcTemplate jdbcTemplate, AdminRowMapper adminRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.adminRowMapper = adminRowMapper;
    }

    @Override
    public List<Admin> selectAllAdmins() {
        var sql= """
                SELECT id, schoolname, name, address, email, password, dateofbirth, gender, classesid
                FROM "admin"
                """;
        return jdbcTemplate.query(sql, adminRowMapper);
    }

    @Override
    public Optional<Admin> selectAdminById(Integer id) {
        var sql = """
                SELECT id, schoolname, name, address, email, password, dateofbirth, gender, classesid
                FROM "admin"
                WHERE id=?
                """;
        return jdbcTemplate.query(sql, adminRowMapper, id)
                .stream()
                .findFirst();
    }

    @Override
    public void insertAdmin(Admin admin) {
        var sql= """
                INSERT INTO "admin"(schoolname, name, address, email, password, dateofbirth, gender, classesid)
                VALUES(?,?,?,?,?,?,?,?)
                """;
        int result = jdbcTemplate.update(
                sql,
                admin.getSchoolName(),
                admin.getName(),
                admin.getAddress(),
                admin.getEmail(),
                admin.getPassword(),
                java.sql.Date.valueOf(admin.getDateOfBirth()),
                admin.getGender().name(),
                admin.getClassesId().toArray(new Integer[0])
        );
        System.out.println("jdbcTemplate.result = "+result);
    }

    @Override
    public boolean existAdminWithEmail(String email) {
        var sql = """
                SELECT count(id)
                FROM "admin"
                WHERE email=?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email);
        return count != null && count > 0;
    }

    @Override
    public void deleteAdminById(Integer id) {
        var sql = """
                DELETE
                FROM "admin"
                WHERE id=?
                """;
        Integer result = jdbcTemplate.update(sql, id);
        System.out.println("deleteUserById result = "+ result);
    }

    @Override
    public boolean existAdminById(Integer id) {
        var sql = """
                SELECT count(id)
                FROM "admin"
                WHERE id=?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }

    @Override
    public void updateAdmin(Admin update) {
        if(update.getSchoolName()!=null){
            String sql = """
                    UPDATE "admin" 
                    SET schoolname = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getSchoolName(),
                    update.getId()
            );
            System.out.println("update admin schoolName result = " +result);
        }
        if(update.getName()!=null){
            String sql = """
                    UPDATE "admin" 
                    SET name = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getName(),
                    update.getId()
            );
            System.out.println("update admin name result = " +result);
        }

        if(update.getAddress()!=null){
            String sql = """
                    UPDATE "admin" 
                    SET address = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getAddress(),
                    update.getId()
            );
            System.out.println("update admin address result = " +result);
        }

        if(update.getEmail()!=null){
            String sql = """
                    UPDATE "admin" 
                    SET email = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getEmail(),
                    update.getId()
            );
            System.out.println("update admin email result = " +result);
        }

        if(update.getPassword()!=null){
            String sql = """
                    UPDATE "admin" 
                    SET password = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getPassword(),
                    update.getId()
            );
            System.out.println("update admin password result = " +result);
        }
        if(update.getDateOfBirth()!=null){
            String sql = """
                    UPDATE "admin" 
                    SET dateofbirth = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    java.sql.Date.valueOf(update.getDateOfBirth()),
                    update.getId()
            );
            System.out.println("update admin dateOfBirth result = " +result);
        }
        if(update.getGender()!=null){
            String sql = """
                    UPDATE "admin" 
                    SET gender = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getGender().name(),
                    update.getId()
            );
            System.out.println("update admin gender result = " +result);
        }
        if(update.getClassesId()!=null){
            String sql = """
                    UPDATE "admin" 
                    SET classesid = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getClassesId().toArray(new Integer[0]),
                    update.getId()
            );
            System.out.println("update admin classesId result = " +result);
        }
    }
}