CREATE TABLE `persons` (
  `person_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `civil_status` varchar(100) NOT NULL,
  `create_time_stamp` datetime NOT NULL DEFAULT current_timestamp(),
  `phone_number` varchar(100) NOT NULL,
  `birthdate` datetime DEFAULT current_timestamp(),
   `group` varchar(100) not null default 'resident',
  PRIMARY KEY (`person_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `person_id` int(11) not null,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `create_time_stamp` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`),
  KEY `users_persons_fk` (`person_id`),
  CONSTRAINT `users_persons_fk` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE positions (
	position_id INT NOT NULL AUTO_INCREMENT,
	title varchar(100) NOT NULL,
	PRIMARY KEY (`position_id`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE officials (
	official_id INT NOT NULL AUTO_INCREMENT,
	person_id INT NOT NULL,
	position_id int not null,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	CONSTRAINT officials_pk PRIMARY KEY (official_id),
	KEY `officials_persons_fk` (`person_id`),
  	CONSTRAINT `officials_persons_fk` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`) ON DELETE cascade,
  	KEY `officials_positions_fk` (`position_id`),
  	CONSTRAINT `officials_positions_fk` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`) ON DELETE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE roles (
	role_id INT NOT NULL AUTO_INCREMENT,
	title varchar(100) NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (`role_id`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


CREATE TABLE person_roles (
	person_role_id INT NOT NULL AUTO_INCREMENT,
	person_id INT NOT NULL,
	role_id int not null,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	CONSTRAINT person_roles_pk PRIMARY KEY (person_role_id),
	KEY `person_roles_persons_fk` (`person_id`),
  	CONSTRAINT `person_roles_persons_fk` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`) ON DELETE cascade,
  	KEY `officials_positions_fk` (`role_id`),
  	CONSTRAINT `person_roles_roles_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


