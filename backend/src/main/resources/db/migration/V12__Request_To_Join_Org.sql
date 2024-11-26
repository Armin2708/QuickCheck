CREATE TABLE organization_join_code(
                                       id BIGSERIAL NOT NULL PRIMARY KEY,
                                       code INT NOT NULL UNIQUE,
                                       organization_id INT NOT NULL REFERENCES organizations(id),
                                       usage_limit INT NOT NULL,
                                       creator_id INT NOT NULL
)