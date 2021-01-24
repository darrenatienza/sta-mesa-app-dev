ALTER TABLE residents ADD if not exists phone_number varchar(100) NOT NULL;
ALTER TABLE residents DROP COLUMN if exists active;
ALTER TABLE residents DROP COLUMN if exists age;
ALTER TABLE residents ADD if not exists birthdate  DATETIME DEFAULT current_timestamp() NULL;

ALTER TABLE users MODIFY COLUMN user_type varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'resident' NOT NULL;


ALTER TABLE st_mesa_db.officials ADD official_position_id INT NOT NULL;
ALTER TABLE st_mesa_db.officials ADD CONSTRAINT officials_official_positions_fk FOREIGN KEY (official_position_id) REFERENCES st_mesa_db.official_positions(official_position_id) ON DELETE CASCADE;

/**changes on 24/01/2021 @ home */
ALTER TABLE sta_mesa_db_2.barangay_clearances ADD request_date DATETIME DEFAULT current_timestamp() NOT NULL;
ALTER TABLE sta_mesa_db_2.barangay_clearances ADD res_cert_no varchar(100) NOT NULL;
ALTER TABLE sta_mesa_db_2.barangay_clearances ADD date_issued DATETIME DEFAULT current_timestamp() NOT NULL;
ALTER TABLE sta_mesa_db_2.barangay_clearances ADD doc_status_id INT DEFAULT 1 NOT NULL;
ALTER TABLE sta_mesa_db_2.barangay_clearances ADD CONSTRAINT barangay_clearances_doc_statuses_fk FOREIGN KEY (doc_status_id) REFERENCES sta_mesa_db_2.doc_statuses(doc_status_id) ON DELETE CASCADE;
