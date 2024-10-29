package com.quickcheck.organization;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class OrganizationRowMapper implements RowMapper<Organization> {
    @Override
    public Organization mapRow(ResultSet rs, int rowNum) throws SQLException {
        Organization organization = new Organization(
                rs.getInt("id"),
                rs.getString("name")
        );

        return organization;
    }
}