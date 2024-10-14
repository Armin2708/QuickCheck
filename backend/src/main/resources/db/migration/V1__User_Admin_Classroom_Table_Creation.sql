CREATE TABLE "user" (
                        id BIGSERIAL NOT NULL PRIMARY KEY,
                        schoolName VARCHAR(255) NOT NULL,
                        name VARCHAR(255) NOT NULL,
                        address VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        dateOfBirth DATE NOT NULL,
                        gender TEXT NOT NULL,
                        classesId INT[] NOT NULL
);

CREATE TABLE "admin" (
                         id BIGSERIAL PRIMARY KEY NOT NULL,
                         schoolName VARCHAR(255) NOT NULL,
                         name VARCHAR(255) NOT NULL,
                         address VARCHAR(255) NOT NULL,
                         email VARCHAR(255) NOT NULL,
                         password VARCHAR(255) NOT NULL,
                         dateOfBirth DATE NOT NULL,
                         gender TEXT NOT NULL,
                         classesId INT[] NOT NULL
);

CREATE TABLE "classroom" (
                         id BIGSERIAL NOT NULL PRIMARY KEY,
                         className VARCHAR(255) NOT NULL,
                         professorId INT NOT NULL REFERENCES "admin"(id),
                         classLocation VARCHAR(255) NOT NULL,
                         startDate VARCHAR(255) NOT NULL,
                         endDate VARCHAR(255) NOT NULL,
                         classDays TEXT[] NOT NULL,
                         studentsId INT[] NOT NULL,
                         adminsId INT[] NOT NULL
);