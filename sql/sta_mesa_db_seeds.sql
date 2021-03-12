/**Default admin user*/
INSERT INTO `sta-mesa-db`.users (user_id , username, password, active,admin, create_time_stamp) 
VALUES(1,'admin', '$2y$10$6W8O2Lxsv0U59/IqhdHkwurTgqNZw1ODbhIYweQSVWEmg0KgJm6sW' , 1,1, current_timestamp()) ON DUPLICATE KEY UPDATE    
username='admin', password='$2y$10$6W8O2Lxsv0U59/IqhdHkwurTgqNZw1ODbhIYweQSVWEmg0KgJm6sW', active=1, admin=1;

INSERT INTO residents
(first_name, middle_name, last_name, age, civil_status, user_id, create_time_stamp, phone_number)
VALUES('admin', 'admin', 'admin', 1, 'single', 1, current_timestamp(), '0');

