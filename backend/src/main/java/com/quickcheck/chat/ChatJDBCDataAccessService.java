package com.quickcheck.chat;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("chat")
public class ChatJDBCDataAccessService implements ChatDao{

    private final JdbcTemplate jdbcTemplate;
    private final ChatRowMapper chatRowMapper;

    public ChatJDBCDataAccessService(JdbcTemplate jdbcTemplate, ChatRowMapper chatRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.chatRowMapper = chatRowMapper;
    }

    @Override
    public List<Chat> selectAllChats() {
        var sql = """
                SELECT id, name, class_id
                FROM chat
                """;
        return jdbcTemplate.query(sql, chatRowMapper);
    }

    @Override
    public List<Chat> selectClassChats(Integer classId) {
        var sql = """
                SELECT id, name, class_id
                FROM chat
                """;
        return jdbcTemplate.query(sql, chatRowMapper);
    }

    @Override
    public List<Chat> selectClassChatsJoined(Integer classId, Integer userId) {
        var sql = """
                SELECT id, name, class_id
                FROM chat JOIN chat_members ON chat.id = chat_members.chat_id
                WHERE class_id = ? AND user_id = ?
                """;
        return jdbcTemplate.query(sql, chatRowMapper, classId, userId);
    }

    @Override
    public Optional<Chat> selectChatById(Integer chatId) {
        var sql = """
                SELECT id, name, class_id
                FROM chat
                WHERE id = ?
                """;
        return jdbcTemplate.query(sql, chatRowMapper, chatId)
                .stream()
                .findFirst();
    }

    @Override
    public boolean existChatById(Integer chatId) {
        var sql = """
                SELECT count(id)
                FROM chat
                WHERE id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, chatId);
        return count != null && count > 0;
    }

    @Override
    public void insertChat(Chat chat) {
        var sql = """
                INSERT INTO chat (name, class_id)
                VALUES (?, ?)
                """;
        int result = jdbcTemplate.update(
                sql,
                chat.getName(),
                chat.getClassId()
        );
        System.out.println("jdbcTemplate result = " + result);
    }

    @Override
    @Transactional
    public void updateChat(Chat update) {
        StringBuilder sqlBuilder = new StringBuilder("UPDATE chat SET ");
        List<Object> params = new ArrayList<>();

        if (update.getName() != null) {
            sqlBuilder.append("name = ?, ");
            params.add(update.getName());
        }

        // Check if there are fields to update
        if (params.isEmpty()) {
            System.out.println("No fields to update for chat with ID: " + update.getId());
            return;
        }
        // Remove the last comma and add the WHERE clause
        sqlBuilder.setLength(sqlBuilder.length() - 2);
        sqlBuilder.append(" WHERE id = ?");
        params.add(update.getId());

        // Execute the single update statement
        String sql = sqlBuilder.toString();
        int result = jdbcTemplate.update(sql, params.toArray());
        System.out.println("Update chat result = " + result);
    }

    @Override
    public void deleteChat(Integer chatId) {
        var sql = """
                DELETE
                FROM chat
                WHERE id = ?
                """;
        int result = jdbcTemplate.update(sql, chatId);
        System.out.println("deleteChatById result = " + result);
    }

    @Override
    public void joinChat(Integer chatId, Integer userId) {
        var sql = """
                INSERT INTO chat_members (chat_id, user_id)
                VALUES (?, ?)
                """;
        int result = jdbcTemplate.update(
                sql,chatId, userId
        );
        System.out.println("jdbcTemplate result = " + result);
    }

    @Override
    public void leaveChat(Integer chatId, Integer userId) {
        var sql = """
                DELETE
                FROM chat_members
                WHERE chat_id = ? AND user_id = ?
                """;
        int result = jdbcTemplate.update(sql, chatId, userId);
        System.out.println("Left Chat result = " + result);
    }

    @Override
    public boolean existUserInChat(Integer chatId, Integer userId) {
        var sql = """
                SELECT count(user_id)
                FROM chat_members
                WHERE chat_id = ? AND user_id = ?
                """;
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, chatId, userId);
        return count != null && count > 0;
    }

}
