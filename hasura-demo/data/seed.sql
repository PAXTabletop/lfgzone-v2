insert into event (name)
values
    ('PAX Unplugged');

insert into status (name)
values
    ('Open'),
    ('Closed'),
    ('Cancelled');

insert into game (name)
values
    ('Ark Nova'),
    ('Arkham Horror'),
    ('Wingspan');

insert into game_session (event_id, game_id, status_id)
values
    (1, 1, 1);

