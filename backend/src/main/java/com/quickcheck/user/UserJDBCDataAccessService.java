package com.quickcheck.user;

import com.quickcheck.Gender;
import com.quickcheck.Roles;
import com.quickcheck.organization.Organization;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
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

    public List<Roles> selectUserRoles(Integer userId) {
        var sql = """
                SELECT role
                FROM user_roles
                WHERE user_id = ?
                """;
        return jdbcTemplate.query(sql, userRolesRowMapper, userId);
    }


    @Override
    public void insertUserRoles(Integer userId, List<Roles> roles) {
        var roleSql = """
            INSERT INTO user_roles (user_id, role)
            VALUES (?, ?)
            """;

        for (Roles role : roles) {
            jdbcTemplate.update(roleSql, userId, role.name());
        }
    }

    @Override
    public void deleteUserRoles(Integer userId) {
        var deleteRolesSql = """
            DELETE FROM user_roles
            WHERE user_id = ?
            """;
        jdbcTemplate.update(deleteRolesSql, userId);
    }

        @Override
        public List<User> selectAllUsers() {
            var sql = """
                SELECT id, name, address, email, password, date_of_birth, gender, profile_image_id
                FROM users
                """;
            List<User> users = jdbcTemplate.query(sql, userRowMapper);
            users.forEach(user -> user.setRoles(selectUserRoles(user.getId())));
            return users;
        }

    @Override
    public List<User> selectChatMembers(Integer chatId) {
        var sql = """
                SELECT id, name, address, email, password, date_of_birth, gender, profile_image_id
                FROM users JOIN chat_members ON users.id = chat_members.user_id
                WHERE chat_id=?
                """;
        List<User> users = jdbcTemplate.query(sql, userRowMapper,chatId);
        users.forEach(user -> user.setRoles(selectUserRoles(user.getId())));
        return users;
    }

    @Override
    public List<User> selectUsersBySearch(String userName) {
        var sql = """
                SELECT id, name, address, email, password, date_of_birth, gender, profile_image_id
                FROM users
                WHERE name ILIKE ?
                """;
        List<User> users = jdbcTemplate.query(sql, userRowMapper, userName);
        users.forEach(user -> user.setRoles(selectUserRoles(user.getId())));
        return users;
    }

    @Override
    public List<User> selectUsersFromOrganizationBySearch(Integer organizationId, String userName) {
        var sql = """
                SELECT users.id, name, address, email, password, date_of_birth, gender, profile_image_id
                FROM users JOIN organization_user ON users.id = organization_user.user_id
                WHERE organization_user.organization_id = ? AND name ILIKE ? 
                """;
        List<User> users = jdbcTemplate.query(sql, userRowMapper, organizationId, userName);
        users.forEach(user -> user.setRoles(selectUserRoles(user.getId())));
        return users;
    }

    @Override
        public Optional<User> selectUserByEmail(String email) {
            var sql = """
                SELECT id, name, address, email, password, date_of_birth, gender, profile_image_id
                FROM users
                WHERE email = ?
                """;
            Optional<User> user = jdbcTemplate.query(sql, userRowMapper, email).stream().findFirst();
            user.ifPresent(u -> u.setRoles(selectUserRoles(u.getId())));
            return user;
        }

    @Override
    public List<User> selectAllUserInOrganizationById(Integer id) {
        var sql = """
                SELECT users.id, users.name, users.address, users.email, users.password, users.date_of_birth, users.gender, users.profile_image_id
                FROM users JOIN organization_user ON (users.id = organization_user.user_id)
                WHERE organization_user.organization_id = ?
                """;

        List<User> users = jdbcTemplate.query(sql, userRowMapper, id);

        // Set roles for each user
        users.forEach(user -> {
            List<Roles> roles = selectUserRoles(user.getId());
            user.setRoles(roles);
        });

        return users;
    }

    @Override
    public List<User> selectAllUserInClassById(Integer classId) {
        var sql = """
                SELECT users.id, users.name, users.address, users.email, users.password, users.date_of_birth, users.gender, users.profile_image_id
                FROM users JOIN class_user ON (users.id = class_user.user_id)
                WHERE class_user.class_id = ?
                """;

        List<User> users = jdbcTemplate.query(sql, userRowMapper, classId);

        // Set roles for each user
        users.forEach(user -> {
            List<Roles> roles = selectUserRoles(user.getId());
            user.setRoles(roles);
        });

        return users;
    }

    @Override
    public Optional<User> selectUserById(Integer id) {
        var sql = """
                SELECT id, name, address, email, password, date_of_birth, gender, profile_image_id
                FROM users
                WHERE id = ?
                """;
        Optional<User> user = jdbcTemplate.query(sql, userRowMapper, id).stream().findFirst();

        user.ifPresent(u -> u.setRoles(selectUserRoles(u.getId())));

        return user;
    }

        @Override
        @Transactional
        public void insertUser(User user) {
            var userSql = """
                INSERT INTO users (name, address, email, password, date_of_birth, gender)
                VALUES (?, ?, ?, ?, ?, ?)
                """;

            jdbcTemplate.update(
                    userSql,
                    user.getName(),
                    user.getAddress(),
                    user.getEmail(),
                    user.getPassword(),
                    user.getDateOfBirth(),
                    user.getGender().name()
            );

            int userId = selectUserByEmail(user.getEmail()).get().getId();

            insertUserRoles(userId, user.getRoles());
        }

        @Override
        @Transactional
        public void updateUser(User update) {
            StringBuilder sqlBuilder = new StringBuilder("UPDATE users SET ");
            List<Object> params = new ArrayList<>();

            if (update.getName() != null) {
                sqlBuilder.append("name = ?, ");
                params.add(update.getName());
            }
            if (update.getAddress() != null) {
                sqlBuilder.append("address = ?, ");
                params.add(update.getAddress());
            }
            if (update.getEmail() != null) {
                sqlBuilder.append("email = ?, ");
                params.add(update.getEmail());
            }
            if (update.getPassword() != null) {
                sqlBuilder.append("password = ?, ");
                params.add(update.getPassword());
            }
            if (update.getDateOfBirth() != null) {
                sqlBuilder.append("date_of_birth = ?, ");
                params.add(update.getDateOfBirth());
            }
            if (update.getGender() != null) {
                sqlBuilder.append("gender = ?, ");
                params.add(update.getGender().name());
            }

            if (params.isEmpty()) {
                System.out.println("No fields to update for user with ID: " + update.getId());
                return;
            }

            sqlBuilder.setLength(sqlBuilder.length() - 2);
            sqlBuilder.append(" WHERE id = ?");
            params.add(update.getId());

            jdbcTemplate.update(sqlBuilder.toString(), params.toArray());

            int userId = selectUserByEmail(update.getEmail()).get().getId();

            // Update roles if they are provided
            if (update.getRoles() != null) {
                deleteUserRoles(userId);
                insertUserRoles(userId, update.getRoles());
            }
        }

        @Override
        @Transactional
        public void deleteUserById(Integer id) {
            var userEmailSql = """
                SELECT email FROM users WHERE id = ?
                """;
            String email = jdbcTemplate.queryForObject(userEmailSql, String.class, id);

            deleteUserRoles(id);

            var userDeleteSql = """
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
                SELECT users.id, users.name, users.address, users.email, users.password, users.date_of_birth, users.gender, users.profile_image_id
                FROM users JOIN attendance_user ON users.id = attendance_user.user_id
                WHERE attendance_user.attendance_id = (
                    SELECT id
                    FROM attendance
                    WHERE tag = ?
                    )
                """;
        List<User> users = jdbcTemplate.query(sql, userRowMapper, attendanceTag);

        // Set roles for each user
        users.forEach(user -> {
            List<Roles> roles = selectUserRoles(user.getId());
            user.setRoles(roles);
        });

        return users;
    }

}
