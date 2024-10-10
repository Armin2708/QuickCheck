package com.quickcheck.user;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    List<User> selectAllUsers();
    Optional<User> selectUserById(Integer id);
    void insertUser(User user);
    boolean existUserWithEmail(String email);
    void deleteUserById(Integer id);
    boolean existUserById(Integer id);
    void updateUser(User update);
    Optional<User> selectUserByEmail(String email);
}
