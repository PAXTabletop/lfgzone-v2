Super simple POC to get a feel for how Hasura might work out for lfgzone2. Very little thought has been put into data, this is just a technical proof of concept.

# TODO

- Join BGG Databases
- Hosting / Estimate on Pricing
- Authenticated queries
- Data loading and migrations

# Initial Setup

## 1. Install Requirements:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (Bundled w/ Docker Desktop)
- [DataGrip (Optional, makes exporting DDL easy)](https://www.jetbrains.com/datagrip/download/download-thanks.html)

## 2. Run the docker-compose file

Note: The docker-compose file retains the disk when restarting. Run `docker compose down -v` to remove the named volume.

- `docker compose up -d`

## 3. Setup the Database

### 1. Connect to postgres with some sort of client:

```
host: 127.0.0.1
port: 5432
user: postgres
password: postgrespassword
```

### 2. Create the lfgzone database:

```
create database lfgzone
    with owner postgres;
```

### 3. Select/Connect to the lfgzone database and run the contents of...
- ddl.sql (create the tables and relationships)
- seed.sql (insert some initial data)


### 4. Setup Hasura

- [Launch the console](http://localhost:8080/console)
- Data -> Data Manager -> Connect Existing Database
  - Name: lfgzone
  - Choose "Environment Variable" and set `PG_DATABASE_URL`


## 5. Import Hasura Metadata

From the [Settings](`http://localhost:8080/console/settings/metadata-actions`) menu in Hasura, import the metadata.json file in /data

## 6. Running the sample web app

Simple app created for nodejs-lts (v16.17.0)

```bash
cd sample-app
ng install
ng serve
```

Routes:
- "" => Open Sessions
- /all => All Sesssions (+ update status to closed)
- /add => /all + Create sessions

# Working with the API

## Sample Queries

Sample query showing a subscription to open sessions

```graphql
query openSessions {
  game_session(order_by: {created_at: asc}, where: {event_id: {_eq: 1}}) {
    game_session_id
    game {
      name
    }
    status {
      name
    }
    created_at
    
  }
}

mutation createSession {
  insert_game_session(objects: {event_id: 1, game_id: 2, status_id: 1}) {
    returning {
      game_session_id
      event {
        name
      }
      game {
        name
      }
      status {
        name
      }
    }
  }
}

mutation closeSession {
  update_game_session_by_pk(pk_columns: {game_session_id: 1}, _set: {status_id: 2}) {
game_session_id
      event {
        name
      }
      game {
        name
      }
      status {
        name
      }
  }
}
```

## Committing Schema Changes

- Export the postgres schema via Data Grip (r-click the lfgzone tables and export DDL to clipboard)
  - Save to data/ddl.sql
- Export the Hasura meta data from [Settings](`http://localhost:8080/console/settings/metadata-actions`)
  - Save to metadata.json

# Resources
This was heavily cribbed from the Hasura getting started guide:

- https://hasura.io/docs/latest/getting-started/docker-simple/
- https://raw.githubusercontent.com/hasura/graphql-engine/stable/install-manifests/docker-compose/docker-compose.yaml
- https://medium.com/@wickedbrat/todo-app-with-hasura-graphql-engine-using-angular-6-aa49957fac19
- https://apollo-angular.com/docs/get-started