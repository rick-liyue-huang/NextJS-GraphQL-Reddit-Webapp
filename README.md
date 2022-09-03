## NextJS GraphQL Reddit WebApp

#### Introduction

This application will clone Reddit again, in which using NextJS to create front-end pages, using supabase to manage backend PostgreSQL database, and using StepZen to create create GraphQL middle layer to query database and then render the data in pages by Apollo/Client.

#### The Project Details

1. SignIn and SinOut with firebase authentication with 'next-auth', and default to login by Reddit account.
2. After sign in, the user can create community, the post under community and the comment under post, by which I create four tables, including community, post, vote and comment in supabase PostgreSQL database.
3. The user also can vote on the single post and show the posts list by vote number.
4. Whatever the user sign in or not, the posts can be shown by searching the community name in search input of navbar.
5. The whole web app can be toggled light and dark mode with 'next-themes'.

#### The Technical Details

1. The project is based on the TypeScript NextJS.
2. The project is beautified by TailwindCSS lib, and switch the light/dark mode by 'next-themes'.
3. Back end SQL database is built on Supabase, and all data are queried and mutated by GraphQL, and then all data are rendered on pages by Apollo/Client lib.

#### Deployment

After deployment to vercel.com, the web app can be view in desktop webpage and mobile page.
