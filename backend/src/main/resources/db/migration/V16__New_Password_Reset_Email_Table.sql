DROP TABLE password_reset_email;
CREATE TABLE password_reset_email(
                                     id BIGSERIAL NOT NULL PRIMARY KEY,
                                     email VARCHAR(255) REFERENCES users(email) NOT NULL,
                                     code VARCHAR(255) NOT NULL UNIQUE,
                                     UNIQUE (email, code)
);