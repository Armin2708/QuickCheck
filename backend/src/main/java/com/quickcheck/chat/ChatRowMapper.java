package com.quickcheck.chat;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class ChatRowMapper implements RowMapper<Chat> {

    @Override
    public Chat mapRow(ResultSet rs, int rowNum) throws SQLException {
        Chat chat = new Chat(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getInt("class_id")
        );
        return chat;
    }
}
