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