Super simple POC to get a feel for how Supabase might work out for lfgzone2. Very little thought has been put into data, this is just a technical proof of concept.

# TODO

- Join BGG Databases
- Hosting / Estimate on Pricing

# Instructions

1. Log into the app: https://app.supabase.com/project/uigkxkubglwdgzlfkgmc/sql

2. Paste the data from the ddl.sql and data.sql and policies.sql intpo the sql editor

3. Update environment file (TODO this current includes a secret key!!!)

4. Get the privateKey from the admin and create environment.ts under app/environments:

```
export const environment = {
  production: false,
  supabaseUrl: 'https://uigkxkubglwdgzlfkgmc.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZ2t4a3ViZ2x3ZGd6bGZrZ21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA5NTMyNTMsImV4cCI6MTk3NjUyOTI1M30.GrS2SVd8_EZ57n9etaU19mzaN27cw5Iay6gQTz-YAVM',
  privateKey: 'PUT THE PRIVATE KEY HERE',
}
```

5. cd app, npm install, ng serve
