import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../app/globals.css"; // Pastikan path ke globals.css benar

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;