## NextJS GraphQL Reddit WebApp

#### Introduction

Using NextJS to create front-end pages.
Using supabase to manage backend PostgreSQL database.
Using StepZen to create create GraphQL middle layer.

here needs to note:

1. npm install -g stepzen
2. stepzen login
3. complete account name and admin password
4. mkdir directory of 'stepzen'
5. inside stepzen directory and run `stepzen init` to create configuration file
6. run `stepzen import postgresql` to connect with postgresql database in supabase
7. follow the rules one by one in 'setting/database' menu.
8. after that, here will create some sample index.graphql file connecting with database
9. run `stepzen start`, by now the the new endpoint created in stepzen
10. in 'apollo-client.js', it match with the stepzen api in headers configuration.
11. run `stepzen whoami --apikey` to get apikey from terminal
12.
