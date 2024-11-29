CREATE UNIQUE INDEX unique_name_lower ON organizations (LOWER(name));
CREATE UNIQUE INDEX unique_email_lower ON users (LOWER(email));