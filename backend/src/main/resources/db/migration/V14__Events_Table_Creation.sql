CREATE TABLE events(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date_time DATE,
    location VARCHAR(255),
    organization_id INTEGER REFERENCES organizations(id) NOT NULL
);

ALTER TABLE organizations
    ADD CONSTRAINT unique_organizations_name UNIQUE (name);

CREATE TABLE organization_user_roles(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    role TEXT NOT NULL,
    organization_name VARCHAR(255) NOT NULL REFERENCES organizations(name),
    UNIQUE (user_id, organization_name, role)
);

CREATE TABLE password_reset_email(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(255) REFERENCES users(email) NOT NULL,
    code INTEGER NOT NULL UNIQUE,
    UNIQUE (email, code)
);

DROP TABLE user_roles;

ALTER TABLE users ADD COLUMN account_type TEXT NOT NULL DEFAULT 'USER';