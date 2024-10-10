package com.quickcheck.user;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
    public void insertUser(User user) {

    }

    @Override
    public boolean existUserWithEmail(String email) {
        return false;
    }

    @Override
    public void deleteUserById(Integer id) {

    }

    @Override
    public boolean existUserById(Integer id) {
        return false;
    }

    @Override
    public void updateUser(User update) {

    }

    @Override
    public Optional<User> selectUserByEmail(String email) {
        return Optional.empty();
    }
}
