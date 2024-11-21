package com.quickcheck.chatMessage;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository("message")
public class MessageJDBCDataAccessService implements MessageDao{

    private final JdbcTemplate jdbcTemplate;
    private final MessageRowMapper messageRowMapper;

    public MessageJDBCDataAccessService(JdbcTemplate jdbcTemplate, MessageRowMapper messageRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.messageRowMapper = messageRowMapper;
    }

    @Override
    public List<Message> selectAllMessagesFromChat(Integer chatId) {

        var sql = """
                    SELECT id, from_id, content, sent_datetime, chat_id
                    FROM chat_messages
                    WHERE chat_id = ?
                """;

        return jdbcTemplate.query(sql,messageRowMapper,chatId);
    }

    @Override
    public Integer insertMessage(Message message) {
        var sql = """
            INSERT INTO chat_messages(from_id, content, sent_datetime, chat_id)
            VALUES (?,?,?,?)
            """;

        KeyHolder keyHolder = new GeneratedKeyHolder(); // Holds the generated keys

        int result = jdbcTemplate.update(connection -> {
            var preparedStatement = connection.prepareStatement(sql, new String[] {"id"});
            preparedStatement.setInt(1, message.getUserId());
            preparedStatement.setString(2, message.getContent());
            preparedStatement.setTimestamp(3, Timestamp.valueOf(message.getDateTime()));
            preparedStatement.setInt(4, message.getChatId());
            return preparedStatement;
        }, keyHolder);

        if (result > 0) {
            Number generatedId = keyHolder.getKey(); // Retrieve the generated key
            if (generatedId != null) {
                return generatedId.intValue(); // Return the generated message ID
            }
        }
        throw new RuntimeException("Failed to insert message."); // Handle failure appropriately
    }

    @Override
    public void deleteMessage(Integer messageId) {
        var sql = """
                DELETE
                FROM chat_messages
                WHERE id = ?
                """;
        int result = jdbcTemplate.update(sql, messageId);
        System.out.println("deleteClassById result = " + result);
    }

    @Override
    public boolean existMessageById(Integer messageId) {
        var sql = """
                SELECT count(id)
                FROM chat_messages
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, messageId);
        return count != null && count > 0;
    }
}
