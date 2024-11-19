CREATE TABLE chat(
                         id BIGSERIAL NOT NULL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         class_id INTEGER NOT NULL REFERENCES classes(id)
);

CREATE TABLE messages(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    from_id INTEGER NOT NULL,
    content VARCHAR(255) NOT NULL,
    sent_datetime DATE NOT NULL,
    chat_id INTEGER NOT NULL REFERENCES chat(id)
);

CREATE TABLE chat_members(
                         chat_id INTEGER NOT NULL REFERENCES chat(id),
                         user_id INTEGER NOT NULL REFERENCES chat(id)


);

ALTER TABLE classes
    ADD COLUMN class_image_id VARCHAR (36) UNIQUE