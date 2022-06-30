// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PublicKey } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { FramesSchema, supabase } from "../../lib/supabase";

export type CreateFrameResponse = {
  data?: FramesSchema;
  error?: {
    message: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateFrameResponse>
) {
  if (req.method === "POST") {
    const { title, description, owner } = req.body;

    try {
      const ownerKey = new PublicKey(owner);
      const { data: frames, error } = await supabase
        .from<FramesSchema>("frames")
        .insert({
          title: title,
          description: description,
          owner_key: ownerKey.toString(),
        });

      if (error || frames.length === 0) {
        console.log(error);
        return res.status(500).send({ error: { message: "Supabase error." } });
      }

      return res.status(200).send({ data: frames[0] });
    } catch (e) {
      return res.status(500).send({
        error: {
          message: "Invalid data provided.",
        },
      });
    }
  } else {
    return res.status(405).send({ error: { message: "Method not allowed." } });
  }
}
