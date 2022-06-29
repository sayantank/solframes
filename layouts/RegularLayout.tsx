import Head from "next/head";
import { ReactNode } from "react";

type RegularLayoutProps = {
  title?: string;
  children: ReactNode;
};

function RegularLayout({ title, children }: RegularLayoutProps) {
  return (
    <>
      <Head>
        <title>{title ? `${title} - SolFrames` : `SolFrames`}</title>
      </Head>
      <div className="w-full max-w-2xl mx-auto h-screen overflow-y-auto flex flex-col space-y-4 px-4 py-4 md:px-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-indigo-600 font-semibold">Solframes</h1>
        </div>
        <div className="flex-1">{children}</div>
        <div className="footer flex justify-center text-sm font-light text-indigo-500">
          Footer
        </div>
      </div>
    </>
  );
}

export const getRegularLayout = (page: React.ReactNode, title?: string) => (
  <RegularLayout title={title}>{page}</RegularLayout>
);
