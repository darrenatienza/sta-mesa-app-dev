ALTER TABLE residents ADD if not exists phone_number varchar(100) NOT NULL;
ALTER TABLE st_mesa_db.residents DROP COLUMN if exists active;
