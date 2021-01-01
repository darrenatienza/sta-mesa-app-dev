ALTER TABLE residents ADD if not exists phone_number varchar(100) NOT NULL;
ALTER TABLE residents DROP COLUMN if exists active;
ALTER TABLE residents ADD birthdate DATETIME DEFAULT current_timestamp() NULL;

