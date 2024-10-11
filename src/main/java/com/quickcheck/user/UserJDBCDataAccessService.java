package com.quickcheck.user;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.sql.Array;  // Import the correct Array class

@Repository("user")
public class UserJDBCDataAccessService implements UserDao {

    private final JdbcTemplate jdbcTemplate;
    private final UserRowMapper userRowMapper;

    public UserJDBCDataAccessService(JdbcTemplate jdbcTemplate, UserRowMapper userRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.userRowMapper = userRowMapper;
    }

    @Override
    public List<User> selectAllUsers() {
        var sql= """
                SELECT id,schoolname,name,address,email,password,dateofbirth,gender,classesid
                FROM "user"
                """;
        return jdbcTemplate.query(sql,userRowMapper);
    }

    @Override
    public Optional<User> selectUserById(Integer id) {
        var sql = """
                SELECT id,schoolname,name,address,email,password,dateofbirth,gender,classesid
                FROM "user"
                WHERE id= ?
                """;
        return jdbcTemplate.query(sql,userRowMapper,id)
                .stream()
                .findFirst();
    }

    @Override
    public void insertUser(User user) throws SQLException {
        var sql= """
                INSERT INTO "user"(schoolname, name, address, email, password, dateofbirth, gender, classesid)
                VALUES(?,?,?,?,?,?,?,?)
                """;

        int result = jdbcTemplate.update(
                sql,
                user.getSchoolName(),
                user.getName(),
                user.getAddress(),
                user.getEmail(),
                user.getPassword(),
                java.sql.Date.valueOf(user.getDateOfBirth()),
                user.getGender().name(),
                user.getClassesId().toArray(new Integer[0])
        );
        System.out.println("jdbcTemplate.result = "+result);

    }

    @Override
    public boolean existUserWithEmail(String email) {
        var sql = """
                SELECT count(id)
                FROM "user"
                WHERE email=?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class,email);
        return count != null &&count>0;
    }


    @Override
    public void deleteUserById(Integer id) {
        var sql = """
                DELETE
                FROM "user"
                WHERE id=?
                """;
        Integer result = jdbcTemplate.update(sql, id);
        System.out.println("deleteUserById result = "+ result);
    }

    @Override
    public boolean existUserById(Integer id) {
        var sql = """
                SELECT count(id)
                FROM "user"
                WHERE id=?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class,id);
        return count != null &&count>0;
    }

    @Override
    public void updateUser(User update) {
        if(update.getSchoolName()!=null){
            String sql = """
                    UPDATE "user" 
                    SET schoolname = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getSchoolName(),
                    update.getId()
            );
            System.out.println("update user schoolName result = " +result);
        }
        if(update.getName()!=null){
            String sql = """
                    UPDATE "user" 
                    SET name = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getName(),
                    update.getId()
            );
            System.out.println("update user name result = " +result);
        }

        if(update.getAddress()!=null){
            String sql = """
                    UPDATE "user" 
                    SET address = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getAddress(),
                    update.getId()
            );
            System.out.println("update user address result = " +result);
        }

        if(update.getEmail()!=null){
            String sql = """
                    UPDATE "user" 
                    SET email = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getEmail(),
                    update.getId()
            );
            System.out.println("update user email result = " +result);
        }

        if(update.getPassword()!=null){
            String sql = """
                    UPDATE "user" 
                    SET password = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getPassword(),
                    update.getId()
            );
            System.out.println("update user password result = " +result);
        }
        if(update.getDateOfBirth()!=null){
            String sql = """
                    UPDATE "user" 
                    SET dateofbirth = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    java.sql.Date.valueOf(update.getDateOfBirth()),
                    update.getId()
            );
            System.out.println("update user dateOfBirth result = " +result);
        }
        if(update.getGender()!=null){
            String sql = """
                    UPDATE "user" 
                    SET gender = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getGender().name(),
                    update.getId()
            );
            System.out.println("update user gender result = " +result);
        }
        if(update.getClassesId()!=null){
            String sql = """
                    UPDATE "user" 
                    SET classesid = ? 
                    WHERE id = ?
                    """;
            int result = jdbcTemplate.update(
                    sql,
                    update.getClassesId().toArray(new Integer[0]),
                    update.getId()
            );
            System.out.println("update user classesId result = " +result);
        }
    }

    @Override
    public Optional<User> selectUserByEmail(String email) {
        var sql = """
                SELECT id,schoolname,name,address,email,password,dateofbirth,gender,classesid
                FROM "user"
                WHERE email= ?
                """;
        return jdbcTemplate.query(sql,userRowMapper,email)
                .stream()
                .findFirst();
    }
}
