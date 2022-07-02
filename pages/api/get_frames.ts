import { PublicKey } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { FramesSchema, supabase } from "../../lib/supabase";

export type GetFramesResponse = {
  data?: FramesSchema[];
  error?: {
    message: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetFramesResponse>
) {
  if (req.method != "GET") {
    return res.status(405).send({ error: { message: "Method not allowed." } });
  }

  const {
    query: { owner },
  } = req;

  if (!owner) {
    return res
      .status(400)
      .send({ error: { message: "Owner address not found." } });
  }

  try {
    const ownerKey = new PublicKey(owner);
    const { data: frames, error } = await supabase
      .from<FramesSchema>("frames")
      .select()
      .eq("owner_key", ownerKey.toString());
    if (error || frames.length === 0) {
      console.log(error);
      return res.status(500).send({ error: { message: "Supabase error." } });
    }

    return res.status(200).send({ data: frames });
  } catch (e) {
    return res.status(500).send({
      error: {
        message: "Invalid owner address provided.",
      },
    });
  }
}
