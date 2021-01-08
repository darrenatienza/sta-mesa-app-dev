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

CREATE TABLE st_mesa_db.officials (
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


create
or replace
view `view_officials` as select
    `officials`.`official_id` as `official_id`,
    `officials`.`resident_id` as `resident_id`,
    `residents`.`first_name` as `first_name`,
    `residents`.`middle_name` as `middle_name`,
    `residents`.`last_name` as `last_name`,
    official_positions.title
from
    (( `officials`
join `residents` on
    ( `officials`.`resident_id` = `residents`.`resident_id` ))
join `official_positions` on
    ( `official_positions`.`official_position_id` = `officials`.`official_position_id` ));


