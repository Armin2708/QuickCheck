package com.quickcheck.user.roles;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("roles")
public class RoleJDBCDataAccessService implements RoleDao{

    private final JdbcTemplate jdbcTemplate;
    private final RoleRowMapper roleRowMapper;

    public RoleJDBCDataAccessService(JdbcTemplate jdbcTemplate, RoleRowMapper roleRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.roleRowMapper = roleRowMapper;
    }

    @Override
    public List<Role> selectUserOrganizationRoles(Integer userId, String organizationName) {
        var sql = """
                SELECT id, user_id, role, organization_name 
                FROM organization_user_roles
                WHERE user_id = ? AND organization_name = ?
                """;
        List<Role> roles = jdbcTemplate.query(sql, roleRowMapper, userId, organizationName);
        return roles;
    }

    @Override
    public List<Role> selectUserOrganizationRolesInClass(Integer userId, Integer classId) {
        var sql = """
                SELECT id, user_id, role, organization_name 
                FROM organization_user_roles
                WHERE user_id = ? AND organization_name = (
                        SELECT organizations.name
                        FROM organizations JOIN classes ON organizations.id = classes.organization_id
                        WHERE classes.id = ?
                    )
                """;
        List<Role> roles = jdbcTemplate.query(sql, roleRowMapper, userId, classId);
        return roles;
    }

    @Override
    public List<Role> selectUserRoles(Integer userId) {
        var sql = """
                SELECT id, user_id, role, organization_name
                FROM organization_user_roles
                WHERE user_id = ?
                """;
        List<Role> roles = jdbcTemplate.query(sql,roleRowMapper, userId);
        return roles;
    }

    @Override
    public void insertRole(Role role) {

        var userSql = """
                INSERT INTO organization_user_roles (user_id, role, organization_name)
                VALUES (?, ?, ?)
                """;

        jdbcTemplate.update(
                userSql,
                role.getUserId(),
                role.getRole().toString(),
                role.getOrganizationName()
        );
    }

    @Override
    public void deleteRole(Integer roleId) {

        var sql = """
                DELETE FROM organization_user_roles
                WHERE id = ?
                """;
        jdbcTemplate.update(sql,roleId);
    }

    @Override
    public boolean existRoleById(Integer roleId) {
        var sql = """
                SELECT count(id)
                FROM organization_user_roles
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, roleId);
        return count != null && count > 0;
    }

    @Override
    public void deleteAllUsersOrganizationRoles(Integer userId, String organizationName) {
        var sql = """
                DELETE FROM organization_user_roles
                WHERE user_id = ? AND organization_name = ?
                """;
        jdbcTemplate.update(sql,userId,organizationName);
    }
}
