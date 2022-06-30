import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import { WalletButton } from "../components/common/WalletButton";

type AppLayoutProps = {
  title?: string;
  children: ReactNode;
};

function AppLayout({ title, children }: AppLayoutProps) {
  return (
    <>
      <Head>
        <title>{title ? `${title} - SolFrames` : `SolFrames`}</title>
      </Head>
      <div className="relative w-full max-w-2xl mx-auto h-screen overflow-y-auto flex flex-col space-y-4 px-4 py-4 md:px-0">
        <div className="flex items-center justify-between px-2">
          <Link href="/">
            <h1 className="text-2xl text-indigo-600 font-semibold cursor-pointer">
              Solframes
            </h1>
          </Link>
          <WalletButton />
        </div>
        <div className="flex-1">{children}</div>
        <div className="footer flex justify-center text-sm font-light text-indigo-500">
          Footer
        </div>
      </div>
    </>
  );
}

export const getAppLayout = (page: React.ReactNode, title?: string) => (
  <AppLayout title={title}>{page}</AppLayout>
);
