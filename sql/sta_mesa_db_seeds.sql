/**Default admin user*/

INSERT INTO users
(user_id,username, password, person_id, active, create_time_stamp)
VALUES(1,'admin', '$2y$10$6W8O2Lxsv0U59/IqhdHkwurTgqNZw1ODbhIYweQSVWEmg0KgJm6sW', 1, 1, current_timestamp())ON DUPLICATE KEY UPDATE    
username='admin', password='$2y$10$6W8O2Lxsv0U59/IqhdHkwurTgqNZw1ODbhIYweQSVWEmg0KgJm6sW', person_id=1, active=1;


