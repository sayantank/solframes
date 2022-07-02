import { PublicKey } from "@solana/web3.js";
import axios from "axios";
import { useEffect } from "react";
import useSWR from "swr";
import { GetFramesResponse } from "../pages/api/get_frames";

const fetcher = async (url: string) => {
  const { data } = await axios.get<GetFramesResponse>(url);

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.data;
};

function useFrames(owner: PublicKey | null) {
  const {
    data: frames,
    error,
    mutate,
    isValidating,
  } = useSWR(
    owner ? `/api/get_frames/?owner=${owner.toString()}` : null,
    fetcher
  );

  return {
    frames,
    error,
    isLoading: !error && !frames && owner,
    isValidating,
    mutate,
  };
}

export default useFrames;
