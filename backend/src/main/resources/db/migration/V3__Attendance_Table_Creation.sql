

CREATE TABLE attendance (
                         id BIGSERIAL NOT NULL PRIMARY KEY,
                         tag TEXT NOT NULL UNIQUE,
                         date DATE NOT NULL,
                         instructor_id INT NOT NULL REFERENCES users(id),
                         class_id INT NOT NULL REFERENCES classes(id),
                         code INT NOT NULL,
                         open_status BOOLEAN NOT NULL,
                         class_radius INT
);

CREATE TABLE attendance_user(
                           id BIGSERIAL NOT NULL PRIMARY KEY,
                           attendance_id INT NOT NULL REFERENCES attendance(id),
                           user_id INT NOT NULL REFERENCES users(id)
);
