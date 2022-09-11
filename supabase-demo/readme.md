Super simple POC to get a feel for how Supabase might work out for lfgzone2. Very little thought has been put into data, this is just a technical proof of concept.

https://lfgzone-supabase.netlify.app/

# TODO

- Join BGG Databases
- Hosting / Estimate on Pricing
  - $25 / month for Supbase (have free tier, not 100% sure if this includes the db hosting on Heroku)
  - $0 for Netlify build/deploy/hosting (+$15 / mo per user past the first)
  - ~$20 / year domain

# Instructions

1. Log into the app: https://app.supabase.com/project/uigkxkubglwdgzlfkgmc/sql

2. If you don't have a database yet: Paste the data from the ddl.sql and data.sql and policies.sql intpo the sql editor

3. cd app, npm install, ng serve

# Links

* Run database queries: https://app.supabase.com/project/uigkxkubglwdgzlfkgmc/sql
* Manage database tables: https://app.supabase.com/project/uigkxkubglwdgzlfkgmc/editor
* Manage users and RBAC: https://app.supabase.com/project/uigkxkubglwdgzlfkgmc/auth/users
