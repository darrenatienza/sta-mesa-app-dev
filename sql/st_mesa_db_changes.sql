ALTER TABLE residents ADD if not exists phone_number varchar(100) NOT NULL;
ALTER TABLE residents DROP COLUMN if exists active;
ALTER TABLE residents DROP COLUMN if exists age;
ALTER TABLE residents ADD if not exists birthdate  DATETIME DEFAULT current_timestamp() NULL;

ALTER TABLE users MODIFY COLUMN user_type varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'resident' NOT NULL;
