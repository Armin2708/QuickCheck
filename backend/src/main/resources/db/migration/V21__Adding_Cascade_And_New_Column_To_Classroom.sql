ALTER TABLE calendar_events
    DROP CONSTRAINT calendar_events_creator_id_fkey,
    ADD CONSTRAINT calendar_events_creator_id_fkey
        FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE  classes
    DROP CONSTRAINT classes_classroom_id_fkey,
    ADD CONSTRAINT classes_classroom_id_fkey
        FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;


DROP TABLE organization_classroom;

DROP TABLE classrooms CASCADE ;

CREATE TABLE classrooms (
                            id BIGSERIAL NOT NULL PRIMARY KEY,
                            room_name VARCHAR(255) NOT NULL UNIQUE,
                            location VARCHAR(255) NOT NULL,
                            capacity INT NOT NULL,
                            organization_id INT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE
);