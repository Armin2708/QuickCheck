-- Add ON DELETE CASCADE to organization_user_roles
ALTER TABLE organization_user_roles
    DROP CONSTRAINT organization_user_roles_user_id_fkey,
    ADD CONSTRAINT organization_user_roles_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE organization_user_roles
    DROP CONSTRAINT organization_user_roles_organization_name_fkey,
    ADD CONSTRAINT organization_user_roles_organization_name_fkey
        FOREIGN KEY (organization_name) REFERENCES organizations(name) ON DELETE CASCADE;

-- Add ON DELETE CASCADE to password_reset_email
ALTER TABLE password_reset_email
    DROP CONSTRAINT password_reset_email_email_fkey,
    ADD CONSTRAINT password_reset_email_email_fkey
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE;

-- Add ON DELETE CASCADE to events
ALTER TABLE events
    DROP CONSTRAINT events_organization_id_fkey,
    ADD CONSTRAINT events_organization_id_fkey
        FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;