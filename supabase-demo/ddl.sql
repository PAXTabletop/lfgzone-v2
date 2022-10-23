create table if not exists game
(
    game_id serial
        primary key,
    name    varchar not null
        unique
);

alter table game
    owner to postgres;

create table if not exists event
(
    event_id serial
        primary key,
    name     varchar not null
);

alter table event
    owner to postgres;

create table if not exists status
(
    status_id serial
        primary key,
    name      varchar not null
        constraint status_status_name_key
            unique
);

alter table status
    owner to postgres;

create table if not exists game_session
(
    game_session_id serial
        primary key,
    event_id        integer                                not null
        references event
            on update restrict on delete restrict,
    game_id         integer                                not null
        references game
            on update restrict on delete restrict,
    created_at      timestamp with time zone default now() not null,
    status_id       integer                  default 1
        references status
            on update restrict on delete restrict
);

alter table game_session
    owner to postgres;
