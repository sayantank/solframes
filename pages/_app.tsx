import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SolanaProvider } from "../context/SolanaContext";
import { NextPage } from "next";

// Use require instead of import since order matters
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SolanaProvider>{getLayout(<Component {...pageProps} />)}</SolanaProvider>
  );
}

export default MyApp;
