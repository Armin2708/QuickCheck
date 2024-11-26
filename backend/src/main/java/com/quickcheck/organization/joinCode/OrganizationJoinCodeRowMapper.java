package com.quickcheck.organization.joinCode;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class OrganizationJoinCodeRowMapper implements RowMapper<OrganizationJoinCode> {
    @Override
    public OrganizationJoinCode mapRow(ResultSet rs, int rowNum) throws SQLException {
        OrganizationJoinCode organizationJoinCode = new OrganizationJoinCode(
                rs.getInt("id"),
                rs.getInt("code"),
                rs.getInt("organization_id"),
                rs.getInt("usage_limit"),
                rs.getInt("creator_id")
        );
        return organizationJoinCode;
    }
}
