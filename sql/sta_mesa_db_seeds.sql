INSERT INTO st_mesa_db.users
(username, password, user_type, active, create_time_stamp)
VALUES('admin', 'admin', 'admin', 1, current_timestamp());

INSERT INTO st_mesa_db.residents
(first_name, middle_name, last_name, age, civil_status, user_id, create_time_stamp, phone_number)
VALUES('admin', 'admin', 'admin', 1, 'single', 1, current_timestamp(), '0');

