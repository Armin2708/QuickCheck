package com.quickcheck.organization;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("organization")
public class OrganizationJDBCDataAccessService implements OrganizationDao {

    private final JdbcTemplate jdbcTemplate;
    private final OrganizationRowMapper organizationRowMapper;

    public OrganizationJDBCDataAccessService(JdbcTemplate jdbcTemplate, OrganizationRowMapper organizationRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.organizationRowMapper = organizationRowMapper;
    }

    @Override
    public List<Organization> selectAllOrganizations() {
        var sql = """
                SELECT id, name
                FROM organizations
                """;
        return jdbcTemplate.query(sql, organizationRowMapper);
    }

    @Override
    public List<Organization> selectAllOrganizationsOfUser(Integer userId) {
        var sql = """
                SELECT organizations.id, organizations.name
                FROM organizations JOIN organization_user ON (organizations.id = organization_user.organization_id)
                WHERE organization_user.user_id = ?
                """;
        return jdbcTemplate.query(sql, organizationRowMapper, userId);
    }

    @Override
    public Optional<Organization> selectOrganizationById(Integer id) {
        var sql = """
                SELECT id, name
                FROM organizations
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql, organizationRowMapper, id)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<Organization> selectOrganizationByName(String name) {
        var sql = """
                SELECT id, name
                FROM organizations
                WHERE name = ?
                """;
        return jdbcTemplate.query(sql, organizationRowMapper, name)
                .stream()
                .findFirst();
    }

    @Override
    public void insertOrganization(Organization organization) {
        var sql = """
                INSERT INTO organizations (name)
                VALUES (?)
                """;
        int result = jdbcTemplate.update(
                sql,
                organization.getName()
        );
        System.out.println("jdbcTemplate result = " + result);
    }

    @Override
    public boolean existOrganizationById(Integer id) {
        var sql = """
                SELECT count(id)
                FROM organizations
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }

    @Override
    public boolean existOrganizationByName(String name) {
        var sql = """
                SELECT count(id)
                FROM organizations
                WHERE name = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, name);
        return count != null && count > 0;
    }

    @Override
    public void deleteOrganizationById(Integer id) {
        var sql = """
                DELETE
                FROM organizations
                WHERE id = ?
                """;
        int result = jdbcTemplate.update(sql, id);
        System.out.println("deleteOrganizationById result = " + result);
    }


    @Override
    @Transactional
    public void updateOrganization(Organization update) {
        StringBuilder sqlBuilder = new StringBuilder("UPDATE organizations SET ");
        List<Object> params = new ArrayList<>();

        if (update.getName() != null) {
            sqlBuilder.append("name = ?, ");
            params.add(update.getName());
        }

        // Check if there are fields to update
        if (params.isEmpty()) {
            System.out.println("No fields to update for organization with ID: " + update.getId());
            return;
        }

        // Remove the last comma and add the WHERE clause
        sqlBuilder.setLength(sqlBuilder.length() - 2);
        sqlBuilder.append(" WHERE id = ?");
        params.add(update.getId());

        // Execute the single update statement
        String sql = sqlBuilder.toString();
        int result = jdbcTemplate.update(sql, params.toArray());
        System.out.println("Update organization result = " + result);
    }

    @Override
    public void joinOrganization(Integer orgId, Integer userId) {
        var sql = """
                INSERT INTO organization_user (user_id, organization_id)
                VALUES (?,?)
                """;
        int result = jdbcTemplate.update(
                sql,userId,orgId
        );
        System.out.println("jdbcTemplate result = " + result);
    }

    @Override
    public void leaveOrganization(Integer orgId, Integer userId) {
        var sql = """
                DELETE
                FROM organization_user
                WHERE user_id = ? AND organization_id = ?
                """;
        int result = jdbcTemplate.update(sql, userId,orgId);
        System.out.println("deleteOrganizationById result = " + result);
    }

    @Override
    public boolean existUserInOrganization(Integer orgId, Integer userId) {
        var sql = """
                SELECT count(id)
                FROM organization_user
                WHERE user_id = ? AND organization_id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId,orgId);
        return count != null && count > 0;
    }

}
