import "@/styles/globals.css";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import Providers from "@/redux/provider";
import { AppContextProvider } from './../context/AppContext';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [loadingDarkMode, setLoadingDarkMode] = useState(true);
  useEffect(() => {
    if (!localStorage.theme) {
      localStorage.theme = "light";
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.add(localStorage.theme);
    }
    setLoadingDarkMode(false);
  }, []);
  if (loadingDarkMode) {
    return undefined;
  }

  return (
      <SessionProvider session={session} refetchOnWindowFocus={true}>
        <Providers>
        <AppContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContextProvider>
        </Providers>
      </SessionProvider>
  );
}
