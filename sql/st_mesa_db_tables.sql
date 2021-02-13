CREATE TABLE persons (
  person_id int(11) NOT NULL AUTO_INCREMENT,
  first_name varchar(100) NOT NULL,
  middle_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  civil_status varchar(100) NOT NULL,
  create_time_stamp datetime NOT NULL DEFAULT current_timestamp(),
  phone_number varchar(100) NOT NULL,
  birthdate datetime DEFAULT current_timestamp(),
  PRIMARY KEY (person_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE users (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  person_id int(11) not null,
  active tinyint(1) NOT NULL DEFAULT 0,
  create_time_stamp datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (user_id),
  KEY users_persons_fk (person_id),
  CONSTRAINT users_persons_fk FOREIGN KEY (person_id) REFERENCES persons (person_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE positions (
	position_id INT NOT NULL AUTO_INCREMENT,
	title varchar(100) NOT NULL,
	PRIMARY KEY (position_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE officials (
	official_id INT NOT NULL AUTO_INCREMENT,
	person_id INT NOT NULL,
	position_id int not null,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	PRIMARY KEY (official_id),
	KEY officials_persons_fk (person_id),
  	CONSTRAINT officials_persons_fk FOREIGN KEY (person_id) REFERENCES persons (person_id) ON DELETE cascade,
  	KEY officials_positions_fk (position_id),
  	CONSTRAINT officials_positions_fk FOREIGN KEY (position_id) REFERENCES positions (position_id) ON DELETE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE roles (
	role_id INT NOT NULL AUTO_INCREMENT,
	title varchar(100) NOT NULL,
	PRIMARY KEY (role_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


CREATE TABLE person_roles (
	person_role_id INT NOT NULL AUTO_INCREMENT,
	person_id INT NOT NULL,
	role_id int not null,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	PRIMARY KEY (person_role_id),
	KEY person_roles_persons_fk (person_id),
  	CONSTRAINT person_roles_persons_fk FOREIGN KEY (person_id) REFERENCES persons (person_id) ON DELETE cascade,
  	KEY officials_positions_fk (role_id),
  	CONSTRAINT person_roles_roles_fk FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


CREATE TABLE doc_statuses (
	doc_status_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	PRIMARY KEY (doc_status_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE barangay_clearances (
	barangay_clearance_id INT NOT NULL AUTO_INCREMENT,
	person_id INT NOT NULL,
	doc_status_id int not null,
	reason varchar(250) not null,
	res_cert_no varchar(250) not null default "",
	date_issued DATETIME DEFAULT current_timestamp() NOT NULL,
	place_issued varchar(250) not null default "",
	request_date DATETIME DEFAULT current_timestamp() NOT NULL,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	PRIMARY KEY (barangay_clearance_id),
	KEY barangay_clearances_persons_fk (person_id),
  	CONSTRAINT barangay_clearances_persons_fk FOREIGN KEY (person_id) REFERENCES persons (person_id) ON DELETE cascade,
  	KEY business_clearances_doc_statues_fk (doc_status_id),
  	CONSTRAINT barangay_clearances_doc_statuses_fk FOREIGN KEY (doc_status_id) REFERENCES doc_statuses (doc_status_id) ON DELETE cascade
  	
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;



CREATE TABLE business_clearances (
	business_clearance_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	address VARCHAR(100) NOT NULL,
	business_nature VARCHAR(100) NOT NULL,
	date_issued datetime  DEFAULT current_timestamp() NOT NULL,
	or_number VARCHAR(100) NOT NULL,
	doc_status_id int not null,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	PRIMARY KEY (business_clearance_id),
	KEY business_clearances_doc_statues_fk (doc_status_id),
  	CONSTRAINT business_clearances_doc_statuses_fk FOREIGN KEY (doc_status_id) REFERENCES doc_statuses (doc_status_id) ON DELETE cascade
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE indigencies (
	indigency_id INT NOT NULL AUTO_INCREMENT,
	person_id INT NOT NULL,
	doc_status_id int not null,
	parents VARCHAR(100) NOT NULL,
	indigent_reason VARCHAR(100) NOT NULL,
	request_date datetime DEFAULT current_timestamp() NOT NULL,
	date_issued datetime DEFAULT current_timestamp() NOT NULL,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	PRIMARY KEY (indigency_id),
	KEY indigencies_persons_fk (person_id),
  	CONSTRAINT indigencies_persons_fk FOREIGN KEY (person_id) REFERENCES persons (person_id) ON DELETE cascade,
  	KEY indigencies_doc_statues_fk (doc_status_id),
  	CONSTRAINT indigencies_doc_statuses_fk FOREIGN KEY (doc_status_id) REFERENCES doc_statuses (doc_status_id) ON DELETE cascade
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


CREATE TABLE relationships (
	relationship_id INT NOT NULL AUTO_INCREMENT,
	person_id INT NOT NULL,
	doc_status_id int not null,
	person_related_with VARCHAR(100) NOT NULL,
	relationship VARCHAR(100) NOT NULL,
	reason VARCHAR(100) NOT NULL,
	request_date datetime DEFAULT current_timestamp() NOT NULL,
	date_issued datetime DEFAULT current_timestamp() NOT NULL,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	 PRIMARY KEY (relationship_id),
	KEY relationships_persons_fk (person_id),
  	CONSTRAINT relationships_persons_fk FOREIGN KEY (person_id) REFERENCES persons (person_id) ON DELETE cascade,
  	KEY relationships_doc_statues_fk (doc_status_id),
  	CONSTRAINT relationships_doc_statuses_fk FOREIGN KEY (doc_status_id) REFERENCES doc_statuses (doc_status_id) ON DELETE cascade
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


CREATE TABLE residencies (
	residency_id INT NOT NULL AUTO_INCREMENT,
	person_id INT NOT NULL,
	doc_status_id int not null,
	residing_span VARCHAR(100) NOT NULL,
	update_time_stamp datetime DEFAULT current_timestamp() NOT NULL,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	PRIMARY KEY (residency_id),
	KEY residencies_persons_fk (person_id),
  	CONSTRAINT residencies_persons_fk FOREIGN KEY (person_id) REFERENCES persons (person_id) ON DELETE cascade,
  	KEY residencies_doc_statues_fk (doc_status_id),
  	CONSTRAINT residencies_doc_statuses_fk FOREIGN KEY (doc_status_id) REFERENCES doc_statuses (doc_status_id) ON DELETE cascade
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
