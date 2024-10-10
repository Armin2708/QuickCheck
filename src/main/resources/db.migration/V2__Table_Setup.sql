ALTER Table class rename to "classroom";

Alter table "user"
    add COLUMN id bigserial not null primary key,
    ADD COLUMN schoolName VARCHAR(255) not null ,
    ADD COLUMN name VARCHAR(255) not null,
    ADD COLUMN address VARCHAR(255) not null,
    ADD COLUMN email VARCHAR(255)not null,
    ADD COLUMN password VARCHAR(255)not null,
    ADD COLUMN dateOfBirth DATE not null,
    ADD COLUMN gender text not null,
    ADD COLUMN classesId int[] not null ;


ALTER TABLE "classroom"
    ADD COLUMN id bigserial not null primary key,
    ADD COLUMN className VARCHAR(255) not null,
    ADD COLUMN professorName VARCHAR(255) not null,
    ADD COLUMN adminsId int[] not null,
    ADD COLUMN studentsId int[] not null,
    ADD COLUMN attendanceOfStudents TEXT not null,
    ADD COLUMN attendanceRecord TEXT not null,
    ADD COLUMN classLocation VARCHAR(255) not null;

ALTER TABLE "admin"
    ADD COLUMN id bigserial primary key not null ,
    ADD COLUMN schoolName VARCHAR(255) not null,
    ADD COLUMN name VARCHAR(255) not null,
    ADD COLUMN address VARCHAR(255) not null,
    ADD COLUMN email VARCHAR(255) not null,
    ADD COLUMN password VARCHAR(255) not null,
    ADD COLUMN dateOfBirth DATE not null,
    ADD COLUMN gender text not null,
    ADD COLUMN classesId int[] not null;