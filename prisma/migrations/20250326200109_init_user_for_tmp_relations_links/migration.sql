-- Insert a default user for existing links
INSERT INTO "User" (name, username, password, "createdAt", "updatedAt")
VALUES (
    'John Doe',
    'john@mail.com',
    '$2a$12$9/gjbRqCQtmiHQ/t6jGhKOG/2nnpmELxFXQVX2nWK9L9K4Q1MKe3e',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Get the ID of the newly created user
DO $$
DECLARE
  new_user_id INT;
BEGIN
    -- Retrieve the ID of the just inserted user
    SELECT id INTO new_user_id FROM "User" WHERE username = 'john@mail.com';

    -- Update all existing links to associate with the new user
    UPDATE "Link" SET "userId" = new_user_id;
END $$