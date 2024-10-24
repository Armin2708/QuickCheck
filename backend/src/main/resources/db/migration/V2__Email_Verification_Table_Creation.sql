CREATE TABLE "emailcheck" (
                        id BIGSERIAL NOT NULL PRIMARY KEY,
                        email VARCHAR(255) NOT NULL UNIQUE ,
                        code VARCHAR(255) NOT NULL

);
