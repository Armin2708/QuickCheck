DROP TABLE chat,chat_members,chat_messages;

CREATE TABLE chat(
                     id BIGSERIAL NOT NULL PRIMARY KEY,
                     name VARCHAR(255) NOT NULL,
                     class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE
);

CREATE TABLE messages(
                         id BIGSERIAL NOT NULL PRIMARY KEY,
                         from_id INTEGER NOT NULL,
                         content VARCHAR(255) NOT NULL,
                         sent_datetime DATE NOT NULL,
                         chat_id INTEGER NOT NULL REFERENCES chat(id) ON DELETE CASCADE
);

CREATE TABLE chat_members(
                             chat_id INTEGER NOT NULL REFERENCES chat(id) ON DELETE CASCADE ,
                             user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);