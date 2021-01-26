create
or replace
view `view_officials` as select
    `officials`.`official_id` as `official_id`,
    `officials`.`person_id` as `person_id`,
    `persons`.`first_name` as `first_name`,
    `persons`.`middle_name` as `middle_name`,
    `persons`.`last_name` as `last_name`,
    `positions`.`title`
from
    (( `officials`
join `persons` on
    ( `officials`.`person_id` = `persons`.`person_id` ))
join `positions` on
    ( `officials`.`position_id` = `positions`.`position_id` ));
    
create
or replace
view `view_person_roles` as select
    person_roles.person_role_id,
    persons.person_id,
    roles.role_id,
    roles.title
from
    (( `person_roles`
join `persons` on
    ( `persons`.person_id = `person_roles`.person_id ))
join `roles` on
    ( `roles`.`role_id` = `person_roles`.`role_id` ));
    
create
or replace
view view_health_workers as select
    person_roles.person_role_id,
    persons.person_id,
    persons.first_name,
    persons.middle_name,
    persons.last_name
from
   person_roles
   
join persons on
   persons.person_id =person_roles.person_id where person_roles.role_id = 3 ;
   
create
or replace
view view_barangay_clearances as select
    barangay_clearances.barangay_clearance_id,
    persons.person_id,
    persons.first_name,
    persons.middle_name,
    persons.last_name,
    barangay_clearances.reason,
    barangay_clearances.request_date,
    persons.birthdate,
    persons.civil_status,
  	doc_statuses.name as doc_status
from
   barangay_clearances
join persons on
   persons.person_id =barangay_clearances.person_id
   join doc_statuses on
   doc_statuses.doc_status_id =barangay_clearances.doc_status_id;
   
   
   create
or replace
view view_business_clearance as select
    business_clearances.business_clearance_id,
    business_clearances.address,
    business_clearances.business_nature,
    business_clearances.date_issued,
    business_clearances.name,
    business_clearances.or_number,
  	doc_statuses.name as doc_status
from
   business_clearances

   join doc_statuses on
   doc_statuses.doc_status_id =business_clearances.doc_status_id;
    
   create or replace view view_indigencies as select 
   indigencies.indigency_id,
   persons.person_id,
   persons.first_name,
   persons.middle_name,
   persons.last_name,
   persons.birthdate,
   persons.civil_status,
   indigencies.parents,
   indigencies.indigent_reason,
   indigencies.date_issued,
   doc_statuses.name doc_status,
   indigencies.request_date
   from indigencies
   join persons on persons.person_id = indigencies.person_id
   join doc_statuses on
   doc_statuses.doc_status_id =indigencies.doc_status_id;
    
   
   create or replace view view_relationships as select 
   relationships.relationship_id,
   persons.person_id,
   persons.first_name,
   persons.middle_name,
   persons.last_name,
   persons.birthdate,
   persons.civil_status,
   relationships.person_related_with,
   relationships.relationship,
   relationships.reason,
   doc_statuses.name doc_status,
   relationships.request_date,
   relationships.date_issued
   from relationships
   join persons on persons.person_id = relationships.person_id
   join doc_statuses on
   doc_statuses.doc_status_id =relationships.doc_status_id;
