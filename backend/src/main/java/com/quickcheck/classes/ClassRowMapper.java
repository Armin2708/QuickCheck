package com.quickcheck.classes;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class ClassRowMapper implements RowMapper<Class> {
    @Override
    public Class mapRow(ResultSet rs, int rowNum) throws SQLException {
        Class classObject = new Class(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getInt("professor_id"),
                rs.getDate("start_date"),
                rs.getDate("end_date"),
                rs.getInt("classroom_id"),
                rs.getInt("organization_id")

        );

        return classObject;
    }
}