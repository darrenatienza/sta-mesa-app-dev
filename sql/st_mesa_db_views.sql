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
    barangay_clearances.reason
from
   barangay_clearances
   
join persons on
   persons.person_id =barangay_clearances.person_id;
    
