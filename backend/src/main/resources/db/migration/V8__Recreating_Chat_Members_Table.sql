DROP TABLE chat_members;

CREATE TABLE chat_members(
                             chat_id INTEGER NOT NULL REFERENCES chat(id),
                             user_id INTEGER NOT NULL REFERENCES users(id)

);