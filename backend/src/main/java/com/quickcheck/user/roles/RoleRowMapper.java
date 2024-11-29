package com.quickcheck.user.roles;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class RoleRowMapper implements RowMapper<Role> {
    @Override
    public Role mapRow(ResultSet rs, int rowNum) throws SQLException {
        Role role = new Role(
                rs.getInt("id"),
                rs.getInt("user_id"),
                RolesTitle.valueOf(rs.getString("role")),
                rs.getString("organization_name")
        );
        return role;
    }
}
