/**changes on 04-30-2021*/
CREATE TABLE fb_posts (
	fb_posts_id INT NOT NULL AUTO_INCREMENT,
	message varchar(1000) NOT NULL,
	create_time_stamp datetime not null default current_timestamp,
	CONSTRAINT fb_posts_pk PRIMARY KEY (fb_posts_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


/**changes on 04-28-2021*/
ALTER TABLE persons ADD profile_pic BLOB NULL;
/** not needed
CREATE TABLE profile_pics (
	profile_pic_id INT NOT NULL AUTO_INCREMENT,
	`data` BLOB NOT NULL,
	person_id INT NOT NULL,
	create_time_stamp DATETIME DEFAULT current_timestamp() NOT NULL,
	CONSTRAINT profile_pics_pk PRIMARY KEY (profile_pic_id),
	CONSTRAINT profile_pics_persons_fk FOREIGN KEY (person_id) REFERENCES sta_mesa_db_2.persons(person_id) ON DELETE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

ALTER TABLE sta_mesa_db_2.persons MODIFY COLUMN profile_pic LONGBLOB DEFAULT NULL NULL; */


/**changes on 07/03/2021 @ home */
ALTER TABLE indigencies ADD update_timestamp datetime NOT null default current_timestamp() on update current_timestamp() ;
ALTER TABLE indigencies MODIFY COLUMN parents varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Not needed for inserting value';
ALTER TABLE indigencies MODIFY COLUMN indigent_reason varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Not needed for inserting value';
ALTER TABLE indigencies MODIFY COLUMN date_issued datetime NOT NULL default current_timestamp() COMMENT 'the value must be base on update time stamp. for future remove';
ALTER TABLE indigencies MODIFY COLUMN request_date datetime   NOT NULL  default current_timestamp() COMMENT 'value must be base on create time stamp. for future remove' ;
ALTER TABLE persons ADD gender varchar(100) NOT null default '';
/** changes on 10/03/2021 **/
ALTER TABLE relationships MODIFY COLUMN relationship varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Not needed. the value must included on person related with field';
ALTER TABLE barangay_clearances MODIFY COLUMN doc_status_id int(11) DEFAULT 1 NOT NULL;
ALTER TABLE business_clearances MODIFY COLUMN doc_status_id int(11) DEFAULT 1 NOT NULL;
/**changes on 13/03/2021**/
ALTER TABLE relationships MODIFY COLUMN relationship varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '' NOT NULL COMMENT 'Not needed. the value must included on person related with field';


