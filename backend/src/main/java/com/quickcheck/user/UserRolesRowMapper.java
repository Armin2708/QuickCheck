package com.quickcheck.user;

import com.quickcheck.Roles;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class UserRolesRowMapper implements RowMapper<Roles> {
    @Override
    public Roles mapRow(ResultSet rs, int rowNum) throws SQLException {
        return Roles.valueOf(rs.getString("role"));
    }
}
