-- Alter foreign keys in each table to add ON DELETE CASCADE

-- 1. Modify classes table to cascade delete on professor_id, classroom_id, and organization_id
ALTER TABLE classes
    DROP CONSTRAINT classes_professor_id_fkey,
    ADD CONSTRAINT classes_professor_id_fkey
        FOREIGN KEY (professor_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE classes
    DROP CONSTRAINT classes_classroom_id_fkey,
    ADD CONSTRAINT classes_classroom_id_fkey
        FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;

ALTER TABLE classes
    DROP CONSTRAINT classes_organization_id_fkey,
    ADD CONSTRAINT classes_organization_id_fkey
        FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;

-- 2. Modify user_roles to cascade delete on user_id
ALTER TABLE user_roles
    DROP CONSTRAINT user_roles_user_id_fkey,
    ADD CONSTRAINT user_roles_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- 3. Modify class_user to cascade delete on user_id and class_id
ALTER TABLE class_user
    DROP CONSTRAINT class_user_user_id_fkey,
    ADD CONSTRAINT class_user_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE class_user
    DROP CONSTRAINT class_user_class_id_fkey,
    ADD CONSTRAINT class_user_class_id_fkey
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE;

-- 4. Modify organization_user to cascade delete on user_id and organization_id
ALTER TABLE organization_user
    DROP CONSTRAINT organization_user_user_id_fkey,
    ADD CONSTRAINT organization_user_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE organization_user
    DROP CONSTRAINT organization_user_organization_id_fkey,
    ADD CONSTRAINT organization_user_organization_id_fkey
        FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;

-- 5. Modify organization_classroom to cascade delete on classroom_id and organization_id
ALTER TABLE organization_classroom
    DROP CONSTRAINT organization_classroom_classroom_id_fkey,
    ADD CONSTRAINT organization_classroom_classroom_id_fkey
        FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE;

ALTER TABLE organization_classroom
    DROP CONSTRAINT organization_classroom_organization_id_fkey,
    ADD CONSTRAINT organization_classroom_organization_id_fkey
        FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;

-- 6. Modify attendance to cascade delete on instructor_id and class_id
ALTER TABLE attendance
    DROP CONSTRAINT attendance_instructor_id_fkey,
    ADD CONSTRAINT attendance_instructor_id_fkey
        FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE attendance
    DROP CONSTRAINT attendance_class_id_fkey,
    ADD CONSTRAINT attendance_class_id_fkey
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE;

-- 7. Modify attendance_user to cascade delete on attendance_id and user_id
ALTER TABLE attendance_user
    DROP CONSTRAINT attendance_user_attendance_id_fkey,
    ADD CONSTRAINT attendance_user_attendance_id_fkey
        FOREIGN KEY (attendance_id) REFERENCES attendance(id) ON DELETE CASCADE;

ALTER TABLE attendance_user
    DROP CONSTRAINT attendance_user_user_id_fkey,
    ADD CONSTRAINT attendance_user_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
