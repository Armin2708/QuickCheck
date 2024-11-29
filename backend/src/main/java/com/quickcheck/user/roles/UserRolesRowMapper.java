package com.quickcheck.user.roles;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class UserRolesRowMapper implements RowMapper<RolesTitle> {
    @Override
    public RolesTitle mapRow(ResultSet rs, int rowNum) throws SQLException {
        return RolesTitle.valueOf(rs.getString("role"));
    }
}
