package com.quickcheck.user;

import com.quickcheck.Roles;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface UserDao {

    List<User> selectAllUsers();

    List<User> selectAllUserInOrganizationById(Integer orgId);

    List<User> selectAllUserInClassById(Integer classId);

    List<User> selectAllUsersOfAttendance(String attendanceTag);

    void insertUserRoles(Integer userId, List<Roles> roles);

    void deleteUserRoles(Integer userId);

    Optional<User> selectUserById(Integer id);
    Optional<User> selectUserByEmail(String email);

    boolean existUserById(Integer id);
    boolean existUserWithEmail(String email);

    boolean existUserInAttendance(Integer userId, String tag);
    boolean existUserInOrganization(Integer userId, String orgName);
    boolean existUserInClass(Integer userId, Integer classId);

    void insertUser(User user) throws SQLException;
    void updateUser(User update);
    void deleteUserById(Integer id);
}
