import Link from "next/link";
import { ReactNode } from "react";
import { getRegularLayout } from "../layouts/RegularLayout";

function Home() {
  return (
    <div className="py-10">
      <div className="hero flex flex-col space-y-4 items-center">
        <p className="text-4xl md:text-6xl font-bold text-center text-indigo-600">
          Earn anywhere,
          <br />
          Track everywhere
        </p>
        <p className="text-center font-light max-w-md text-indigo-500 text-sm md:text-base">
          Collect revenue from anywhere using Solana Pay and track all your
          revenue sources at the same place.
        </p>
        <Link href={"/app"}>
          <button className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold rounded-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => getRegularLayout(page, "Home");

export default Home;
