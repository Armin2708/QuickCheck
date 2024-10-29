package com.quickcheck.user;

import com.quickcheck.Roles;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface UserDao {

    List<User> selectAllUsers();

    List<User> selectAllUserInOrganizationById(Integer orgId);

    List<User> selectAllUserInClassById(Integer classId);

    void insertUserRoles(String email, List<Roles> roles);

    void deleteUserRoles(String email);

    Optional<User> selectUserById(Integer id);
    Optional<User> selectUserByEmail(String email);

    boolean existUserById(Integer id);
    boolean existUserWithEmail(String email);

    void insertUser(User user) throws SQLException;
    void updateUser(User update);
    void deleteUserById(Integer id);
}
