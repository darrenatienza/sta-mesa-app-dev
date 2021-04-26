/**person */
INSERT into persons
(person_id,first_name, middle_name, last_name, civil_status, create_time_stamp, phone_number, birthdate, gender)
VALUES(1,'admin', 'admin', 'admin', 'admin', current_timestamp(), '0000000', current_timestamp(), 'male') on duplicate key update 
first_name = 'admin', middle_name='admin',last_name = 'admin';

/**Default admin user*/
INSERT INTO users
(user_id,username, password, person_id, active, create_time_stamp)
VALUES(1,'admin', '$2y$10$6W8O2Lxsv0U59/IqhdHkwurTgqNZw1ODbhIYweQSVWEmg0KgJm6sW', 1, 1, current_timestamp())ON DUPLICATE KEY UPDATE    
username='admin', password='$2y$10$6W8O2Lxsv0U59/IqhdHkwurTgqNZw1ODbhIYweQSVWEmg0KgJm6sW', person_id=1, active=1;

/**doc status*/
INSERT INTO doc_statuses
(doc_status_id,name, create_time_stamp)
VALUES(1,'Pending', current_timestamp()) on duplicate key update name='Pending';

INSERT INTO doc_statuses
(doc_status_id,name, create_time_stamp)
VALUES(2,'Released', current_timestamp()) on duplicate key update name='Released';

/**roles*/
INSERT INTO roles
(role_id, title)
VALUES(1,'admin') on duplicate key update title ='admin';

INSERT INTO roles
(role_id, title)
VALUES(2,'official') on duplicate key update title ='official';

INSERT INTO roles
(role_id, title)
VALUES(3,'bhw') on duplicate key update title ='bhw';

/**positions*/
INSERT into positions
(position_id, title)
VALUES(1,'Barangay Chairman')on duplicate key update title = 'Barangay Chairman';

INSERT into positions
(position_id, title)
VALUES(2,'Councilor') on duplicate key update title = 'Councilor';

INSERT into positions
(position_id, title)
VALUES(3,'Secretary')on duplicate key update title = 'Secretary';

INSERT into positions
(position_id, title)
VALUES(4,'Treasurer')on duplicate key update title = 'Treasurer';


