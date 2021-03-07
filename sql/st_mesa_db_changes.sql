/**changes on 07/03/2021 @ home */
ALTER TABLE indigencies ADD update_timestamp datetime NOT null default current_timestamp() on update current_timestamp() ;
ALTER TABLE indigencies MODIFY COLUMN parents varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Not needed for inserting value';
ALTER TABLE indigencies MODIFY COLUMN indigent_reason varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Not needed for inserting value';
ALTER TABLE indigencies MODIFY COLUMN date_issued datetime NOT NULL default current_timestamp() COMMENT 'the value must be base on update time stamp. for future remove';
ALTER TABLE indigencies MODIFY COLUMN request_date datetime   NOT NULL  default current_timestamp() COMMENT 'value must be base on create time stamp. for future remove' ;