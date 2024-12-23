package com.quickcheck.user;

import com.quickcheck.user.roles.UserRolesRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("user")
public class UserJDBCDataAccessService implements UserDao {

    private final JdbcTemplate jdbcTemplate;
    private final UserRowMapper userRowMapper;
    private final UserRolesRowMapper userRolesRowMapper;

    public UserJDBCDataAccessService(JdbcTemplate jdbcTemplate, UserRowMapper userRowMapper, UserRolesRowMapper userRolesRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.userRowMapper = userRowMapper;
        this.userRolesRowMapper = userRolesRowMapper;
    }

        @Override
        public List<User> selectAllUsers() {
            var sql = """
                SELECT id, name, address, email, password, date_of_birth, gender, profile_image_id, account_type
                FROM users
                """;
            List<User> users = jdbcTemplate.query(sql, userRowMapper);
            return users;
        }

    @Override
    public List<User> selectChatMembers(Integer chatId) {
        var sql = """
                SELECT id, name, address, email, password, date_of_birth, gender, profile_image_id,account_type
                FROM users JOIN chat_members ON users.id = chat_members.user_id
                WHERE chat_id=?
                """;
        List<User> users = jdbcTemplate.query(sql, userRowMapper,chatId);
        return users;
    }

    @Override
    public List<User> selectUsersBySearch(String userName) {
        var sql = """
                SELECT id, name, address, email, password, date_of_birth, gender, profile_image_id,account_type
                FROM users
                WHERE name ILIKE ?
                """;
        List<User> users = jdbcTemplate.query(sql, userRowMapper, userName);
        return users;
    }

    @Override
    public List<User> selectUsersFromOrganizationBySearch(Integer organizationId, String userName) {
        var sql = """
                SELECT users.id, name, address, email, password, date_of_birth, gender, profile_image_id,account_type
                FROM users JOIN organization_user ON users.id = organization_user.user_id
                WHERE organization_user.organization_id = ? AND name ILIKE ? 
                """;
        List<User> users = jdbcTemplate.query(sql, userRowMapper, organizationId, userName);
        return users;
    }

    @Override
        public Optional<User> selectUserByEmail(String email) {
            var sql = """
                SELECT id, name, address, email, password, date_of_birth, gender, profile_image_id, account_type
                FROM users
                WHERE email = ?
                """;
            Optional<User> user = jdbcTemplate.query(sql, userRowMapper, email).stream().findFirst();
            return user;
        }

    @Override
    public List<User> selectAllUserInOrganizationById(Integer id) {
        var sql = """
                SELECT users.id, users.name, users.address, users.email, users.password, users.date_of_birth, users.gender, users.profile_image_id, users.account_type
                FROM users JOIN organization_user ON (users.id = organization_user.user_id)
                WHERE organization_user.organization_id = ?
                """;

        List<User> users = jdbcTemplate.query(sql, userRowMapper, id);
        return users;
    }

    @Override
    public List<User> selectAllUserInClassById(Integer classId) {
        var sql = """
                SELECT users.id, users.name, users.address, users.email, users.password, users.date_of_birth, users.gender, users.profile_image_id, users.account_type
                FROM users JOIN class_user ON (users.id = class_user.user_id)
                WHERE class_user.class_id = ?
                """;

        List<User> users = jdbcTemplate.query(sql, userRowMapper, classId);

        return users;
    }

    @Override
    public Optional<User> selectUserById(Integer id) {
        var sql = """
                SELECT id, name, address, email, password, date_of_birth, gender, profile_image_id,account_type
                FROM users
                WHERE id = ?
                """;
        Optional<User> user = jdbcTemplate.query(sql, userRowMapper, id).stream().findFirst();

        return user;
    }

        @Override
        public void insertUser(User user) {
            var sql = """
                INSERT INTO users (name, address, email, password, date_of_birth, gender, account_type)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """;

            jdbcTemplate.update(sql,
                    user.getName(),
                    user.getAddress(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getDateOfBirth(),
                    user.getGender().name(),
                    user.getAccountType().name()
            );
    }

    @Override
    public void updateUser(User update) {

        var sql = """
                UPDATE users
                SET name = ?, address = ?, email = ?, password = ?, date_of_birth = ?, gender = ?, account_type = ?
                WHERE id = ?
                """;

        jdbcTemplate.update(sql,
                update.getName(),
                update.getAddress(),
                update.getEmail(),
                update.getPassword(),
                update.getDateOfBirth(),
                update.getGender().name(),
                update.getAccountType().name(),
                update.getId()
                );
    }

    @Override
    public void deleteUserById(Integer id) {
        var userDeleteSql =
               """
                DELETE FROM users
                WHERE id = ?
               """;
        jdbcTemplate.update(userDeleteSql, id);
    }

    @Override
    public void updateUserProfileImageId(String profileImageId, Integer userId) {
        var sql = """
                UPDATE users
                SET profile_image_id = ?
                WHERE id = ?
                """;
        jdbcTemplate.update(sql, profileImageId, userId);
    }

    @Override
    public boolean existUserById(Integer id) {
        var sql = """
                SELECT count(id)
                FROM users
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }

    @Override
    public boolean existUserWithEmail(String email) {
        var sql = """
                SELECT count(id)
                FROM users
                WHERE LOWER(email) = LOWER(?)
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email);
        return count != null && count > 0;
    }

    @Override
    public boolean existUserInAttendance(Integer userId, String tag) {
        var sql = """
                SELECT count(id)
                FROM attendance_user
                WHERE user_id = ? AND attendance_id = (
                    SELECT id
                    FROM attendance
                    WHERE tag = ?
                    )
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class,userId, tag);
        return count != null && count > 0;
    }
    @Override
    public boolean existUserInOrganization(Integer userId, String orgName) {
        var sql = """
                SELECT count(id)
                FROM organization_user
                WHERE user_id = ? AND organization_id = (
                    SELECT id
                    FROM organizations
                    WHERE name = ?
                    )
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class,userId, orgName);
        return count != null && count > 0;
    }
    @Override
    public boolean existUserInClass(Integer userId, Integer classId) {
        var sql = """
                SELECT count(id)
                FROM class_user
                WHERE user_id = ? AND class_id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class,userId, classId);
        return count != null && count > 0;
    }

    @Override
    public boolean existUserInChat(Integer userId, Integer chatId) {
        var sql = """
                SELECT count(user_id)
                FROM chat_members
                WHERE user_id = ? AND chat_id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class,userId, chatId);
        return count != null && count > 0;
    }

    @Override
    public List<User> selectAllUsersOfAttendance(String attendanceTag) {
        var sql = """
                SELECT users.id, users.name, users.address, users.email, users.password, users.date_of_birth, users.gender, users.profile_image_id, users.account_type
                FROM users JOIN attendance_user ON users.id = attendance_user.user_id
                WHERE attendance_user.attendance_id = (
                    SELECT id
                    FROM attendance
                    WHERE tag = ?
                    )
                """;
        List<User> users = jdbcTemplate.query(sql, userRowMapper, attendanceTag);

        // Set roles for each user
        return users;
    }

}
