

/**changes on 24/01/2021 @ home */
ALTER TABLE barangay_clearances ADD request_date DATETIME DEFAULT current_timestamp() NOT NULL;
ALTER TABLE barangay_clearances ADD res_cert_no varchar(100) NOT NULL;
ALTER TABLE barangay_clearances ADD date_issued DATETIME DEFAULT current_timestamp() NOT NULL;
ALTER TABLE barangay_clearances ADD doc_status_id INT DEFAULT 1 NOT NULL;
ALTER TABLE barangay_clearances ADD CONSTRAINT barangay_clearances_doc_statuses_fk FOREIGN KEY (doc_status_id) REFERENCES doc_statuses(doc_status_id) ON DELETE CASCADE;
