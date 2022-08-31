import NextAuth from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
});

// https://www.reddit.com/dev/api/ to get the reddit API endpoint
// https://www.reddit.com/prefs/apps
// redirect uri: http://localhost:3000/api/auth/callback/reddit
