CREATE TABLE organizations(
                               id BIGSERIAL NOT NULL PRIMARY KEY,
                               name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
                        id BIGSERIAL NOT NULL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        address VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL UNIQUE ,
                        password VARCHAR(255) NOT NULL,
                        date_of_birth DATE NOT NULL,
                        gender TEXT NOT NULL
);

CREATE TABLE classrooms (
                             id BIGSERIAL NOT NULL PRIMARY KEY,
                             room_name VARCHAR(255) NOT NULL UNIQUE,
                             location VARCHAR(255) NOT NULL,
                             capacity INT NOT NULL
);

CREATE TABLE classes (
                         id BIGSERIAL NOT NULL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         professor_id INT NOT NULL REFERENCES users(id),
                         start_date DATE NOT NULL,
                         end_date DATE NOT NULL,
                         classroom_id INT NOT NULL REFERENCES classrooms(id),
                         organization_id INT NOT NULL REFERENCES organizations(id)
);

CREATE TABLE user_roles(
                        id BIGSERIAL NOT NULL PRIMARY KEY,
                        user_id INT NOT NULL REFERENCES users(id),
                        role TEXT NOT NULL
);


CREATE TABLE class_user (
                            id BIGSERIAL NOT NULL PRIMARY KEY,
                            user_id INT NOT NULL REFERENCES users(id),
                            class_id INT NOT NULL REFERENCES classes(id)
);

CREATE TABLE organization_user (
                                     id BIGSERIAL NOT NULL PRIMARY KEY,
                                     user_id INT NOT NULL REFERENCES users(id),
                                     organization_id INT NOT NULL REFERENCES organizations(id)
);

CREATE TABLE organization_classroom (
                                        id BIGSERIAL NOT NULL PRIMARY KEY,
                                        classroom_id INT NOT NULL REFERENCES classrooms(id),
                                        organization_id INT NOT NULL REFERENCES organizations(id)
);