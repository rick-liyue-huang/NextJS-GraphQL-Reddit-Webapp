import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { client } from '../apollo/apollo-client';
import { Header } from '../components/Header/Header';
import '../styles/globals.css';

// let the global project support provider, match with pages/api/auth/[...nextauth].ts
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class">
          <Toaster />
          <div className="h-screen w-screen overflow-y-scroll bg-green-50 dark:bg-gray-600">
            <Header />
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
