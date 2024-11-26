package com.quickcheck.organization.joinCode;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("organizationJoinCode")
public class OrganizationJoinCodeJDBCDataAccessService implements OrganizationJoinCodeDao{

    private final OrganizationJoinCodeRowMapper organizationJoinCodeRowMapper;
    private final JdbcTemplate jdbcTemplate;

    public OrganizationJoinCodeJDBCDataAccessService(OrganizationJoinCodeRowMapper organizationJoinCodeRowMapper, JdbcTemplate jdbcTemplate) {
        this.organizationJoinCodeRowMapper = organizationJoinCodeRowMapper;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<OrganizationJoinCode> selectAllOrganizationJoinCodeFromOrganization(Integer organizationId) {
        var sql = """
                SELECT id,code,organization_id,usage_limit,creator_id
                FROM organization_join_code
                WHERE organization_id = ?
                """;
        return jdbcTemplate.query(sql, organizationJoinCodeRowMapper,organizationId);
    }

    @Override
    public Optional<OrganizationJoinCode> selectOrganizationJoinCodeById(Integer id) {
        var sql = """
                SELECT id,code,organization_id,usage_limit,creator_id
                FROM organization_join_code
                WHERE id=?
                """;

        return jdbcTemplate.query(sql, organizationJoinCodeRowMapper, id)
                .stream()
                .findFirst();
    }

    @Override
    public Optional<OrganizationJoinCode> selectOrganizationJoinCodeByCode(Integer code) {
        var sql = """
                SELECT id,code,organization_id,usage_limit,creator_id
                FROM organization_join_code
                WHERE code=?
                """;

        return jdbcTemplate.query(sql, organizationJoinCodeRowMapper, code)
                .stream()
                .findFirst();
    }

    @Override
    public boolean existOrganizationJoinCodeById(Integer id) {
        var sql = """
                SELECT count(id)
                FROM organization_join_code
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }

    @Override
    public boolean existOrganizationJoinCodeByCode(Integer code) {
        var sql = """
                SELECT count(id)
                FROM organization_join_code
                WHERE code = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, code);
        return count != null && count > 0;
    }

    @Override
    public void insertOrganizationJoinCode(OrganizationJoinCode organizationJoinCode) {

        var sql = """
                INSERT INTO organization_join_code (code,organization_id,usage_limit,creator_id)
                VALUES (?,?,?,?)
                """;
        int result = jdbcTemplate.update(sql,
                organizationJoinCode.getCode(),
                organizationJoinCode.getOrganizationId(),
                organizationJoinCode.getUsageLimit(),
                organizationJoinCode.getCreatorId()
                );
        System.out.println("JdbcTemplate result = " + result);

    }

    @Override
    public void updateOrganizationJoinCode(Integer id, OrganizationJoinCode update) {

        var sql = """
                UPDATE organization_join_code 
                SET code = ?, organization_id = ?, usage_limit = ?, creator_id = ?
                WHERE id = ?
                """;

        int result = jdbcTemplate.update(sql,
                update.getCode(),
                update.getOrganizationId(),
                update.getUsageLimit(),
                update.getCreatorId(),
                id
        );

        System.out.println("JdbcTemplate result = " + result);

    }

    @Override
    public void deleteOrganizationJoinCode(Integer id) {
        var sql = """
                    DELETE 
                    FROM organization_join_code
                    WHERE id = ?
                """;
        int result = jdbcTemplate.update(sql,id);
        System.out.println("JdbcTemplate result = " + result);

    }
}
