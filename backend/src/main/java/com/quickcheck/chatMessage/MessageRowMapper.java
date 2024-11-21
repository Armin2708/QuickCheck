package com.quickcheck.chatMessage;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class MessageRowMapper implements RowMapper<Message> {
    @Override
    public Message mapRow(ResultSet rs, int rowNum) throws SQLException {
        Message message = new Message(
                rs.getInt("id"),
                rs.getInt("from_id"),
                rs.getString("content"),
                rs.getTimestamp("sent_datetime").toLocalDateTime(),
                rs.getInt("chat_id")
        );
        return message;
    }
}
