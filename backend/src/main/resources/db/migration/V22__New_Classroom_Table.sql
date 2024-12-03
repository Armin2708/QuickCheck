DROP TABLE classrooms CASCADE ;

CREATE TABLE classrooms (
                            id BIGSERIAL NOT NULL PRIMARY KEY,
                            name VARCHAR(255) NOT NULL ,
                            location VARCHAR(255) NOT NULL,
                            capacity INT NOT NULL,
                            organization_id INT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
                            UNIQUE (name,organization_id)
);