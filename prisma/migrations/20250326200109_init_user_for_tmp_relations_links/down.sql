-- Remove relation between temporary user and links
DO $$
DECLARE
  tmp_user_id INT;
BEGIN
    -- Retrieve the ID of the temporary user
    SELECT id INTO tmp_user_id FROM "User" WHERE username = 'john@mail.com';

    -- Update all existing links to remove association with the temporary user
    UPDATE "Link" SET "userId" = NULL WHERE "userId" = tmp_user_id;
END $$;

-- Remove temporary user
DELETE FROM "User" WHERE username = 'john@mail.com';