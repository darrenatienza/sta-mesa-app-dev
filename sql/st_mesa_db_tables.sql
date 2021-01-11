CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_type` varchar(100) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `create_time_stamp` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `residents` (
  `resident_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
   `age` int(11) NOT NULL,
  `civil_status` varchar(100) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT null,
  `create_time_stamp` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`resident_id`),
  KEY `residents_users_fk` (`user_id`),
  CONSTRAINT `residents_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE officials (
	official_id INT NOT NULL AUTO_INCREMENT,
	resident_id INT NOT NULL,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	CONSTRAINT officials_pk PRIMARY KEY (official_id),
	CONSTRAINT officials_residents_fk FOREIGN KEY (resident_id) REFERENCES st_mesa_db.residents(resident_id) ON DELETE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


CREATE TABLE st_mesa_db.official_positions (
	official_position_id INT NOT NULL AUTO_INCREMENT,
	title varchar(100) NOT NULL,
	CONSTRAINT official_positions_pk PRIMARY KEY (official_position_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


CREATE TABLE `persons` (
  `person_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `civil_status` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time_stamp` datetime NOT NULL DEFAULT current_timestamp(),
  `phone_number` varchar(100) NOT NULL,
  `birthdate` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`person_id`),
  KEY `persons_users_fk` (`user_id`),
  CONSTRAINT `persons_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;


create table roles (
	role_id int(11) not null AUTO_INCREMENT,
	title varchar(100) not null,
	create_time_stamp datetime NOT NULL DEFAULT current_timestamp(),
	 PRIMARY KEY (`role_id`)
)

CREATE TABLE residents_roles (
	resident_role_id INT NOT NULL AUTO_INCREMENT,
	resident_id int(11) NOT NULL,
	role_id int(11) not null,
	PRIMARY KEY (resident_role_id),
  	KEY `residents_residents_roles_fk` (`resident_id`),
  	CONSTRAINT `residents_residents_roles_fk` FOREIGN KEY (`resident_id`) REFERENCES `residents` (`resident_id`) ON DELETE cascade,
  	KEY `roles_residents_roles_fk` (`role_id`),
  	CONSTRAINT `roles_residents_roles_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE
)





