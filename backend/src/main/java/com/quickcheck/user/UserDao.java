package com.quickcheck.user;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface UserDao {
    List<User> selectAllUsers();
    Optional<User> selectUserById(Integer id);
    void insertUser(User user) throws SQLException;
    boolean existUserWithEmail(String email);
    void deleteUserById(Integer id);
    boolean existUserById(Integer id);
    void updateUser(User update);
    Optional<User> selectUserByEmail(String email);
}
