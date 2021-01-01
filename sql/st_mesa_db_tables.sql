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