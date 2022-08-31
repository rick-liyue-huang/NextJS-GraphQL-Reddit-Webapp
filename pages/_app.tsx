import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header/Header';
import '../styles/globals.css';

// let the global project support provider, match with pages/api/auth/[...nextauth].ts
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="h-screen w-screen overflow-y-scroll bg-green-50">
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
